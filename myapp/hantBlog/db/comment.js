var mongoose = require('./db'),
  Schema = mongoose.Schema;

var commentSchema = new Schema({
  blogID: {
    type: String
  },
  date: {
    type: Date
  },
  user: {
    type: String
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);