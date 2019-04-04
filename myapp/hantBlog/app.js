const express = require('express');
const bodyParser = require('body-parser'); // body-parser中间件来解析请求体
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./api/index');
const usersRouter = require('./api/users');
const uploadRouter = require('./api/upload');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// eslint-disable-next-line func-names
const allowCrossDomain = function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // 自定义中间件，设置跨域需要的响应头。
  next();
};

app.use(allowCrossDomain); // 运用跨域的中间件
app.use(bodyParser.text()); // 运用中间件，对请求体的文本进行解析

app.use('/', indexRouter);
app.use('/api/index', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/upload', uploadRouter);
// 热更新使用
// eslint-disable-next-line func-names
const server = app.listen(8081, () => {

  let host = server.address().address
  let port = server.address().port
});

// 正式环境使用
// module.exports = app;
