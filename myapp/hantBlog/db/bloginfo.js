var mongoose = require('./db'),
  Schema = mongoose.Schema;

var blogSchema = new Schema({
  author: { //作者
    type: String
  },
  publishdate: { //发表时间
    type: Date
  },
  group: { //类别
    type: String
  },
  title: { //标题
    type: String
  },
  content: { //内容
    type: String
  },
  likeCount: {
    type: Number,
    default: 0
  },
  unlikeCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Blog', blogSchema);
