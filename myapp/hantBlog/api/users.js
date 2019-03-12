var express = require('express');
var router = express.Router();
var user = require('../db/userInfo');
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("req:" + req.query.username);
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

module.exports = router;
