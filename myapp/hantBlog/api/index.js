var express = require('express');
var blog = require('../db/bloginfo');
var like = require('../db/like');
var unlike = require('../db/unlike');
var comment = require('../db/comment');
var collect = require('../db/collect');
var router = express.Router();
//List
router.get('/', function (req, res, next) {
  var query = req.query;
  var params = {};
  if (query.flag == "0" || query.flag == "1") {
    params = JSON.parse(query.data);
  } else if (query.flag == 2 || query.flag == 3) {
    params = {
      _id: {
        $in: JSON.parse(query.data).ids
      }
    }
  }
  blog.find(params, {
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
      res.send(resData);
    }
  });
});
//del
router.get('/del', function (req, res, next) {
  var query = req.query;
  var params = {};
  console.log(query);
  blog.deleteOne({
    "_id": query.id,
  }, function (err, resData) {
    if (err) {
      console.log("Error:" + err);
    } else {
      res.send({
        flag: 1,
        note: '成功'
      });
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
router.get('/getCommentByUser', function (req, res, next) {
  comment.find({
    "user": req.query.user
  }, function (err, resData) {
    res.send(resData);
  });
});

//
router.post('/postComment', function (req, res, next) {
  var info = new comment(req.body.data);
  if (req.body.flag == 0) {
    comment.deleteOne({
      "_id": req.body.data.id,
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
          "$inc": {
            "commentCount": -1
          }
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
          "$inc": {
            "commentCount": 1
          }
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
          "$inc": {
            "likeCount": -1
          }
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
          "$inc": {
            "likeCount": 1
          }
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
          "$inc": {
            "unlikeCount": -1
          }
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
          "$inc": {
            "unlikeCount": 1
          }
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

router.get('/getCollectByIDAndUser', function (req, res, next) {
  collect.findOne({
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
router.get('/getCollectByUser', function (req, res, next) {
  collect.find({
    "user": req.query.user
  }, function (err, resData) {
    res.send(resData);
  });
});
//
router.post('/postCollect', function (req, res, next) {
  if (req.body.flag == 0) {
    collect.deleteOne({
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
          "$inc": {
            "collectCount": -1
          }
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
    var info = new collect(req.body.data);
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
          "$inc": {
            "collectCount": 1
          }
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
