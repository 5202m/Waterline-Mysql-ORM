#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var loadModels = require('../models/models');
//var logger = require('../resources/logConf').getLogger('pm_chat_executor'); //引入log4js
app.orm.initialize(app.config, function(err, models) {
  if (err) {
    console.log('waterline initialize failed, err:', err);
    return;
  }
  console.log('waterline initialize success.');
  loadModels.init(models.collections);

  /*＃＃＃＃＃＃＃＃＃＃路由入口设置＃＃＃＃＃＃＃＃begin */
  var index = require('../routers/index').init(app); //配置同源页面路由

  app.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error('redis session is not work!'));
    }
    next();
  });
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

  var port = "3000";
//启动服务
  var mysqlORMServer = app.listen(port, function () {
    console.log('mysql ORM Server running. Listening on port ' + mysqlORMServer.address().port);
    //开启定时器
  });
  mysqlORMServer.on('error', onError);
  mysqlORMServer.on('listening', onListening);
  process.on('uncaughtException', err => {
    console.error("this is some error,please check:", err);
  });
  process.on('unhandledRejection', (reason, ...args) => {
    let strReason = JSON.stringify(reason);
    console.info(`Promise unhandledRejection >> Reason: ${strReason}`,
        args || "");
  });

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = `Pipe ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = mysqlORMServer.address();
    var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
});