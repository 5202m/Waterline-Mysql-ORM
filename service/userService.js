/**
 * Created by Administrator on 2017/7/11.
 */
let models = require('../models/models');

var userService = {
  save : function(param, callback){
    models.table('user').create(param).then(ret => {
      callback({result: 0, success: 'Success', data:{id: ret.id } });
    }).catch(err => {
      console.log('error:',err);
      callback({result: 1, error: 'Some error occured', data:null });
    });
    /*models.table('user').create(param).exec(function(err, result){
        if (err) {
          callback({result: 1, error: 'Some error occured', data:null });
        }
        callback({result: 0, success: 'Success', data:{id: result.id } });
      });*/
  },
  list : function(param, callback){
    models.table('user').find().skip(param.skip).limit(param.limit).then(list => {
      callback({result: 0, error:'', data: list });
    }).catch(err => {
      console.log('error:',err);
      callback({result: 1, error: 'Some error occured'});
    });
    /*models.table('user').find().skip(param.skip).limit(param.limit).exec(function(err, result){
      if(err){
        console.log('error:',err);
        callback({result: 1, error: 'Some error occured'});
      }
      callback({result: 0, error:'', data: result });
    });*/
  },
  modifyById : function(param, callback){
    models.table('user').update(param.query, param.update).then(ret => {
      callback({result: 0, success: 'Success', data:ret });
    }).catch(err => {
      console.log('error:',err);
      callback({result: 1, error: 'Some error occured', data:null });
    });
    /*models.table('user').update(param.query, param.update).exec(function(err, result){
     if(err){
     console.log('error:',err);
     callback({result: 1, error: 'Some error occured'});
     }
     callback({result: 0, error:'', data: result });
     });*/
  },
  getUserOne : function(param, callback){
    models.table('user').findOne(param).then(ret => {
      callback({result: 0, error:'', data: ret });
    }).catch(err => {
      console.log('error:',err);
      callback({result: 1, error: 'Some error occured'});
    });
    /*models.table('user').findOne(param).exec(function(err, result){
     if(err){
     console.log('error:',err);
     callback({result: 1, error: 'Some error occured'});
     }
     callback({result: 0, error:'', data: result });
     });*/
  },
  delete : function(param, callback){
    models.table('user').destroy(param).then(ret => {
      callback({result: 0, error:'', data: ret });
    }).catch(err => {
      console.log('error:',err);
      callback({result: 1, error: 'Some error occured'});
    });
    /*models.table('user').destroy(param).exec(function(err, result){
     if(err){
     console.log('error:',err);
     callback({result: 1, error: 'Some error occured'});
     }
     callback({result: 0, error:'', data: result });
     });*/
  }
};

module.exports = userService;

