var express = require('express');
var blog = require('../db/bloginfo');

var router = express.Router();

router.get('/', function (req, res, next) {
  blog.find({}, {
    "group": 1,
    "author": 1,
    "publishdate": 1,
    "title": 1
  }).sort({
    "publishdate": -1
  }).exec(function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Success:" + resData);
      res.send(resData);
    }
  });
});

router.get('/Content', function (req, res, next) {
  console.log("111");
  console.log(req.query);
  blog.findOne({"_id":req.query.id},function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Success:" + resData);
      res.send(resData);
    }
  });
});

router.post('/publish', function (req, res, next) {
  console.log(req.body);
  var info = new blog(req.body);
  info.save(function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Success");
    }
  });
  res.send({
    flag: 1,
    note: '保存成功'
  });
});
module.exports = router;
