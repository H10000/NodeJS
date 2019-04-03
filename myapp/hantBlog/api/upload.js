const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/image',multipartMiddleware, function (req,res) {
    console.log(req.files);
res.send(req.body,req.files,req.files.file.path);

});

module.exports = router;