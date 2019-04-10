const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');

/*生产环境 上传*/
router.post('/image', function (req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/files/'
  });
  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.files[0];
      var uploadedPath = inputFile.path;
      //   var dstPath = './public/files/' + inputFile.originalFilename;
      //   //重命名为真实文件名
      //   fs.rename(uploadedPath, dstPath, function (err) {
      //     if (err) {
      //       console.log('rename error: ' + err);
      //     } else {
      //       console.log('rename ok');
      //     }
      //   });
    }

    res.send({
      "location": uploadedPath.replace("public\\","")

    });
  });
});
//开发环境 上传
router.post('/imagedevelopment', function (req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/files/'
  });
  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.files[0];
      var uploadedPath = inputFile.path;
      //   var dstPath = './public/files/' + inputFile.originalFilename;
      //   //重命名为真实文件名
      //   fs.rename(uploadedPath, dstPath, function (err) {
      //     if (err) {
      //       console.log('rename error: ' + err);
      //     } else {
      //       console.log('rename ok');
      //     }
      //   });
    }

    res.send({
      "location": uploadedPath.replace("public\\","")

    });
  });
});

//上传头像
router.post('/headImg', function (req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/headImg/'
  });
  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      //   var dstPath = './public/files/' + inputFile.originalFilename;
      //   //重命名为真实文件名
      //   fs.rename(uploadedPath, dstPath, function (err) {
      //     if (err) {
      //       console.log('rename error: ' + err);
      //     } else {
      //       console.log('rename ok');
      //     }
      //   });
    }

    res.send({
      "location": uploadedPath.replace("public\\","")

    });
  });
});
module.exports = router;
