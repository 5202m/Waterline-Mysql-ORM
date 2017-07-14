/**
 * Created by Administrator on 2017/7/11.
 */
"use strict";
let express = require('express');
let router = express.Router();
let userService = require('../../service/userService');

router.get('/',function(req,res){
  res.render('index');
});

router.get("/save", (req, res) => {
  userService.save(
      {firstName:'test',lastName:'test'},
      (data) => {
        res.json(data);
      }
  );
});

router.get('/list', (req, res) => {
  var param = {skip:req.query['page']||0, limit: req.query['pagesize']||20};
  userService.list(param, (data) => {
    res.json(data);
  });
});

router.get('/modify', (req, res) => {
  var param = {query: req.query['id'], update:{firstName:'os', lastName:'t'}};
  userService.modifyById(param, (data) => {
    res.json(data);
  });
});

router.get('/getOne', (req, res) => {
  var param = {id:req.query['id']};
  userService.getUserOne(param, (data) => {
    req.session.userInfo = data.data;
    console.log(req.session.userInfo);
    res.json(data);
  });
});

router.get('/delete', (req, res) => {
  var param = {id:req.query['id']};
  userService.delete(param, (data) => {
    res.json(data);
  });
});

router.get('/logout', (req, res) => {
  req.session.userInfo = null;
  res.json(req.session.userInfo);
});



module.exports = router;