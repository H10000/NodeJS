/**
 * 用户信息
 */
var mongoose = require('./db'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String
  }, //用户账号
  userpwd: {
    type: String
  }, //密码
  registerdate: {
    type: Date
  }, //注册时间
  headImg:{
    type:String
  },//头像地址
});

module.exports = mongoose.model('User', UserSchema);
