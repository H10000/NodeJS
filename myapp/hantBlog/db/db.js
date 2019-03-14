var mongoose = require('mongoose');
var DB_URL = 'mongodb://hant:707808@47.94.17.72:27017/hantBlog';
mongoose.connect(DB_URL, {
  useNewUrlParser: true
}, function (err) {
  if (err) {

    console.log('Connection Error:' + err)

  } else {

    console.log('Connection success!')

  }
});

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose
