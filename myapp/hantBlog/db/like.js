var mongoose = require('./db'),
  Schema = mongoose.Schema;

var likeSchema = new Schema({
  blogID: {
    type: String
  },
  date: {
    type: Date
  },
  user: {
    type: String
  }
});

module.exports = mongoose.model('Like', likeSchema);
