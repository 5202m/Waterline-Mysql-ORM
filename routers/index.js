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
  app.use('/', indexRouter);
  indexRouter.use("/user", userRoutes);
};