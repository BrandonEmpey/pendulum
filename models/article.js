const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: String,
  description: String,
  author: String,
  originalSource: String,
  link: String,
  image: String,
	grade: String
  // gradeIds: [{ type: Schema.Types.ObjectId, ref: 'Grade'}],
  // commentIds: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
});
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
