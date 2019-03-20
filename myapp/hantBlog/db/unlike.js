var mongoose = require('./db'),
  Schema = mongoose.Schema;

var unlikeSchema = new Schema({
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

module.exports = mongoose.model('unLike', unlikeSchema);