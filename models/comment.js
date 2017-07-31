const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
  content: String,
  replies: String,
  userIds: { type:Schema.Types.ObjectId, ref: 'User'},
  articleIds: { type: Schema.Types.ObjectId, ref: 'Article'}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
