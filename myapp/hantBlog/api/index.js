var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var resData = {
    'list': [{
        author: "Hant",
        group: "Blog",
        title: "你发生过的最尴尬的事是什么？",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "你发生过的最尴尬的事是什么？",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "你发生过的最尴尬的事是什么？",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "你发生过的最尴尬的事是什么？",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "你发生过的最尴尬的事是什么？",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      },
      {
        author: "Hant",
        group: "Blog",
        title: "文章标题",
        publishdate: "2019-03-01 19:30:00"
      }
    ]
  };
  res.send(resData);
});

module.exports = router;
