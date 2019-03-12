var express = require('express');
var bodyParser = require('body-parser'); //body-parser中间件来解析请求体
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api/index');
var usersRouter = require('./api/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
  next();
};

app.use(allowCrossDomain); //运用跨域的中间件
app.use(bodyParser.text()); //运用中间件，对请求体的文本进行解析

app.use('/', indexRouter);
app.use('/api/index', indexRouter);
app.use('/api/user', usersRouter);

//热更新使用
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
})

//正式环境使用
//module.exports = app;
