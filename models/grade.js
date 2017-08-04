const mongoose = require('mongoose');
const {Schema} = mongoose;

const gradeSchema = new Schema({
  score: Number, // +100 for good articles
  userId: { type: Schema.Types.ObjectId, ref: 'User'}
  articleId: { type: Schema.Types.ObjectId, ref: 'Article'}
});
const Grade = mongoose.model('Grade', gradeSchema);

// Grade.find({articleId:},
//   (err, grades) => {
//     var sumScore=0;
//     for (var i=0; i < grades[i].score; i++){
//       sumScore += grades[i].score;
//     }
//     var average = sumScore/grades.length;
//   }
// )

module.exports = Grade;
