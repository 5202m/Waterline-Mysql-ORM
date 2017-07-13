/**
 * Created by Administrator on 2017/7/11.
 */
/*＃＃＃＃＃＃＃＃＃＃引入所需插件＃＃＃＃＃＃＃＃begin */
var express = require('express');
const compression = require('compression');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
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

/*＃＃＃＃＃＃＃＃＃＃路由入口设置＃＃＃＃＃＃＃＃begin */
var index = require('./routers/index').init(app); //配置同源页面路由

// catch 404 and forward to error handler （400请求错误处理）
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace （开发模式）
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user（500请求错误处理）
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/*＃＃＃＃＃＃＃＃＃＃定义app配置信息＃＃＃＃＃＃＃＃end */

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
    port: '3306',
    user: config.dbUserName,
    password: config.dbUserPWD
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
