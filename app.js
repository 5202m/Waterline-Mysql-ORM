/**
 * Created by Administrator on 2017/7/11.
 */
/*＃＃＃＃＃＃＃＃＃＃引入所需插件＃＃＃＃＃＃＃＃begin */
var express = require('express');
var redis   = require("redis");
const compression = require('compression');
var path = require('path');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var client  = redis.createClient();
//var logConf = require('./resources/logConf');
var config = require('./resources/config');
/*＃＃＃＃＃＃＃＃＃＃引入所需插件＃＃＃＃＃＃＃＃end */

/*＃＃＃＃＃＃＃＃＃＃定义app配置信息＃＃＃＃＃＃＃＃begin */
var app = express();
// view engine setup(定义页面，使用html）
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express); //两个下划线
//logConf.initConfig();
//logConf.use(app); //配置框架日志输出
app.use(compression());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({host:config.redisUrlObj.host, port: config.redisUrlObj.port,client:client, ttl:  300}),
  secret: 'myRedisSession',
  //connection: config.redisUrlObj,//{host: '127.0.0.1', port: 6379},
  maxAge: 3600,
  sessionId: 'my.sid'
}));

/*＃＃＃＃＃＃＃＃＃＃数据库连接配置＃＃＃＃＃＃＃＃begin */
var models = require('./models/models');
var orm = new Waterline();
// 适配器
var adapters = {
  mysql: mysqlAdapter,
  default: 'mysql'
};

// 连接
var connections = {
  mysql: {
    adapter: 'mysql',
    //url: 'mysql://root:@localhost/test'
    host: config.dbURL,
    database: config.dbName,
    port: config.dbPort,
    user: config.dbUserName,
    password: config.dbUserPWD,
    // Optional
    charset   : config.dbCharSet,
    collation : config.dbCollation
  }
};
var wlconfig = {
  adapters: adapters,
  connections: connections
};
models.load(orm);
/*＃＃＃＃＃＃＃＃＃＃数据库连接配置＃＃＃＃＃＃＃＃end */

(function(JSON) {
  //let logger = logConf.getLogger("application");
  let jParse = JSON.parse;
  JSON.parse = function() {
    try {
      return jParse.apply(JSON, arguments);
    } catch (e) {
      console.error(`JSON parse Error in ${arguments.callee.name}: `, e);
      return {};
    };
  };
  let jStringify = JSON.stringify;
  JSON.stringify = function() {
    try {
      return jStringify.apply(JSON, arguments);
    } catch (e) {
      console.error(`JSON stringify Error in ${arguments.callee.name}: `, e);
      return "";
    }
  };
})(global.JSON);

module.exports = app;
module.exports.orm = orm;
module.exports.config = wlconfig;
