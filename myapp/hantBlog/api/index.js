var express = require('express');
var blog = require('../db/bloginfo');
var like = require('../db/like');
var unlike = require('../db/unlike');
var comment = require('../db/comment');
var router = express.Router();
//List
router.get('/', function (req, res, next) {
  blog.find({}, {
    "group": 1,
    "author": 1,
    "publishdate": 1,
    "title": 1,
    "likeCount": 1,
    "unlikeCount": 1,
    "commentCount": 1
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
//Read
router.get('/Content', function (req, res, next) {
  blog.findOne({
    "_id": req.query.id
  }, function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      res.send(resData);
    }
  });
});
//Write
router.post('/publish', function (req, res, next) {
  var info = new blog(req.body);
  info.save(function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      //console.log("Success");
    }
  });
  res.send({
    flag: 1,
    note: '保存成功'
  });
});

//
router.get('/getCommentByIDAndUser', function (req, res, next) {
  comment.findOne({
    "blogID": req.query.blogID,
    "user": req.query.user
  }, function (err, resData) {
    res.send(resData);
  });
});

//
router.get('/getCommentByID', function (req, res, next) {
  comment.find({
    "blogID": req.query.blogID
  }, function (err, resData) {
    res.send(resData);
  });
});
//
router.post('/postComment', function (req, res, next) {
  console.log(req.body.data);
  var info = new comment(req.body.data);
  if (req.body.flag == 0) {
    comment.deleteOne({
      "blogID": req.body.data.blogID,
      "user": req.body.data.user
    }, function (err, resData) {
      if (err) {
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        blog.updateOne({
          "_id": req.body.data.blogID
        }, {
          "commentCount": req.body.count
        }, function (err2, resData2) {
          if (err2) {
            res.send({
              flag: 0,
              note: '失败'
            });
          } else {
            res.send({
              flag: 1,
              note: '成功'
            });
          }
        });
      }
    });
  } else if (req.body.flag == 2) {
    info.updateOne({
      "blogID": req.body.data.blogID,
      "user": req.body.data.user
    }, {
      "content": req.body.content
    }, function (err, resData) {
      if (err) {
        console.log("Error:" + err);
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        res.send({
          flag: 0,
          note: '失败'
        });
      }
    });
  } else {
    info.save(function (err, resData) {
      if (err) {
        console.log("Error:" + err);
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        blog.updateOne({
          "_id": req.body.data.blogID
        }, {
          "commentCount": 10
        }, function (err2, resData2) {
          if (err2) {
            res.send({
              flag: 0,
              note: '失败'
            });
          } else {
            res.send({
              flag: 1,
              note: '成功'
            });
          }
        });
      }
    });
  }
});
//
router.get('/getLikeByIDAndUser', function (req, res, next) {
  like.findOne({
    "blogID": req.query.blogID,
    "user": req.query.user
  }, function (err, resData) {
    if (err) {
      res.send({
        flag: 0,
        note: '失败'
      });
    } else {
      res.send(resData);
    }
  });
});
//
router.post('/postLike', function (req, res, next) {
  var info = new like(req.body.data);
  if (req.body.flag == 0) {
    like.deleteOne({
      "blogID": req.body.data.blogID,
      "user": req.body.data.user
    }, function (err, resData) {
      if (err) {
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        blog.updateOne({
          "_id": req.body.data.blogID
        }, {
          "likeCount": req.body.count
        }, function (err2, resData2) {
          if (err2) {
            res.send({
              flag: 0,
              note: '失败'
            });
          } else {
            res.send({
              flag: 1,
              note: '成功'
            });
          }
        });
      }
    });
  } else {
    info.save(function (err, resData) {
      if (err) {
        console.log("Error:" + err);
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        blog.updateOne({
          "_id": req.body.data.blogID,
        }, {
          "likeCount": req.body.count
        }, function (err2, resData2) {
          if (err2) {
            res.send({
              flag: 0,
              note: '失败'
            });
          } else {
            res.send({
              flag: 1,
              note: '成功'
            });
          }
        });
      }
    });
  }
});
//
router.get('/getunLikeByIDAndUser', function (req, res, next) {
  unlike.findOne({
    "blogID": req.query.blogID,
    "user": req.query.user
  }, function (err, resData) {
    res.send(resData);
  });
});
//
router.post('/postunLike', function (req, res, next) {
  var info = new unlike(req.body.data);
  if (req.body.flag == 0) {
    unlike.deleteOne({
      "blogID": req.body.data.blogID,
      "user": req.body.data.user
    }, function (err, resData) {
      if (err) {
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        blog.updateOne({
          "_id": req.body.data.blogID
        }, {
          "unlikeCount": req.body.count
        }, function (err2, resData2) {
          if (err2) {
            res.send({
              flag: 0,
              note: '失败'
            });
          } else {
            res.send({
              flag: 1,
              note: '成功'
            });
          }
        });
      }
    });
  } else {
    info.save(function (err, resData) {
      if (err) {
        res.send({
          flag: 0,
          note: '失败'
        });
      } else {
        blog.updateOne({
          "_id": req.body.data.blogID,
        }, {
          "unlikeCount": req.body.count
        }, function (err2, resData2) {
          if (err2) {
            res.send({
              flag: 0,
              note: '失败'
            });
          } else {
            res.send({
              flag: 1,
              note: '成功'
            });
          }
        });
      }
    });
  }
});
module.exports = router;
