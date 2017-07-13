/**
 * Created by Administrator on 2017/7/11.
 */
const express = require('express');
const path = require('path');
const indexRouter = express.Router();
const apiRoutes = express();
const userRoutes = require("./web/userRouter");

indexRouter.get('/', function(req, res) {
  res.render('index');
});
/**
 * 初始化入口
 * @param app
 */
exports.init = app => {
  //app.use('/apidoc', express.static(path.join(__dirname, '../apidoc/')));
  app.use('/', indexRouter);
  //app.use('/web',apiRoutes);
  //设置跨域访问
  /*apiRoutes.all('/common|upload|message/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,X_Requested_With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("P3P","CP=CAO PSA OUR");//处理ie跨域问题
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });*/

  //授权处理
  /*apiRoutes.all(/\/chat\/getMessage/, (req, res, next) => {//拦截token授权接口
    var roomCode = req.query["roomCode"];
    if(constant.studioGroupType.studio == roomCode){//直播间聊天记录不校验token(webui特例)
      next();
      return;
    }
    var token=req.query.token||req.body.token;
    require("../service/tokenService").verifyToken(token, isOK => {
      if(isOK){
        next();
      }else{
        var ApiResult = require('../util/ApiResult');
        var errorMessage = require('../util/errorMessage.js');
        logger.warn("check token fail->token:" + token);
        if(req.path.indexOf('.xml')!=-1){
          res.end(ApiResult.result(errorMessage.code_15,null,ApiResult.dataType.xml));
        }else{
          res.json(ApiResult.result(errorMessage.code_15,null));
        }
      }
    });
  });*/

  indexRouter.use("/user", userRoutes);
};