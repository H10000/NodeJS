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
  }
  //,
  //   like: { //点赞
  //     type: [{
  //       date: {
  //         type: Date
  //       },
  //       user: {
  //         type: String
  //       }
  //     }]
  //   },
  //   unlick: { //不点赞
  //     type: [{
  //       date: {
  //         type: Date
  //       },
  //       user: {
  //         type: String
  //       }
  //     }]
  //   },
  //   comment: { //评价
  //     type: [{
  //       date: {
  //         type: Date
  //       },
  //       user: {
  //         type: String
  //       },
  //       content: {
  //         type: String
  //       }
  //     }]
  //   }
});

module.exports = mongoose.model('Blog', blogSchema);
