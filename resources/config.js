/**
 * Created by Administrator on 2017/7/11.
 */
var config = {
  redisUrlObj: { host: 'localhost', port: 6379 }, //链接redis缓存客户端连接
  //db
  dbName: 'test',
  dbURL: 'localhost',
  dbUserName: 'root',
  dbUserPWD: '',
  dbPort: '3306',
  dbCharSet: 'utf8',
  dbCollation: 'utf8_swedish_ci'
};
//导出常量类
module.exports = config;