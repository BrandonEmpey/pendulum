const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  gradeIds: [{ type: Schema.Types.ObjectId, ref: 'Grade'}],
  commentIds: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
