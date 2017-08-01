const mongoose = require('mongoose');
const {Schema} = mongoose;

const gradeSchema = new Schema({
  isUpvoted: Boolean,
  isDownvoted: Boolean,
  factBased: Number, // +5 for  factBased, -5 for opinionBased
  userId: { type: Schema.Types.ObjectId, ref: 'User'}
  articleId: { type: Schema.Types.ObjectId, ref: 'Article'}

});
const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
