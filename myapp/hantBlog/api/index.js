var express = require('express');
var blog = require('../db/bloginfo');
var router = express.Router();

router.get('/', function (req, res, next) {
  blog.find({}, function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Success:" + resData);
      res.send(resData);
    }
  });
});

router.post('/publish', function (req, res, next) {
  var d = {
    author: "Hant",
    publishdate: new Date(),
    group: "生活",
    title: "今天是个好日子"
  };
  var info = new blog(d);
  console.log("test");
  info.save(function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Success");
    }
  });
});
module.exports = router;
