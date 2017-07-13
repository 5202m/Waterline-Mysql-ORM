/**
 * Created by Administrator on 2017/7/11.
 */

let Waterline = require('waterline');
var User = Waterline.Collection.extend({
    tableName : 'user',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    connection: 'mysql',
    attributes: {
      id:{
        type: 'INTEGER',
        columnName: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      }
    },
  beforeCreate: function(v, cb){
    //v.createTime = new Date();
    return cb();
  },
  print: function(v) {
    console.log('\tfirstName:', v.firstName);
    console.log('\tlastName:', v.lastName);
  }
});
module.exports = User;