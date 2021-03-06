var express = require('express');
var router = express.Router();
var user = require('../db/userInfo');
/* GET users listing. */
router.get('/', function (req, res, next) {
  user.find({
    username: req.query.username
  }, function (err, resData) {
    console.log(resData);
    if (resData == null || resData.length == 0) {
      res.send({
        flag: '0',
        note: '未找到用户！'
      });
    } else {
      if (resData[0].userpwd.replace(/^\s+|\s+$/g, "") == req.query.userpwd.replace(
          /^\s+|\s+$/g, "")) {
        res.send({
          flag: '1',
          note: '登陆成功！'
        });

      } else {
        res.send({
          flag: '2',
          note: '密码不正确！'
        });
      }
    }
  });
});

router.get('/register', function (req, res, next) {
  user.find({
    username: req.query.username
  }, function (err, resData) {
    if (resData == null || resData.length == 0) {
      var info = new user({
        username: req.query.username,
        userpwd: req.query.userpwd,
        registerdate: new Date()
      });
      info.save(function (err, resData) {
        if (err) {
          console.log("Error:" + err);
        } else {
          //console.log("Success");
        }
      });
      res.send({
        flag: 1,
        note: '注册成功！'
      });
    } else {
      res.send({
        flag: '0',
        note: '用户已存在！'
      });
    }
  });
});

//
router.get('/userInfo', function (req, res, next) {
  user.findOne({
    username: req.query.username
  }, {
    headImg: 1,
    registerdate: 1,
    username: 1,
    _id: 1
  }, function (err, resData) {
    res.send(resData);
  });
});
//更新头像
router.post('/updateUser', function (req, res, next) {
  user.updateOne(
    req.body.flag, req.body.data,
    function (err2, resData2) {
      if (err2) {
        res.send({
          flag: 0,
          note: '修改失败!'
        });
      } else {
        res.send({
          flag: 1,
          note: '修改成功!'
        });
      }
    });
});
module.exports = router;
