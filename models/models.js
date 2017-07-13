/**
 * Created by Administrator on 2017/7/13.
 */

let user = require('./user.js');

var models = {
  collections : {},
  load:function(orm){
    orm.loadCollection(user);
  },
  init:function(collections){
    this.collections = collections;
  },
  table:function (name) {
    return this.collections[name];
  }
};
module.exports = models;