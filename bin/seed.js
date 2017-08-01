const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost/pendulum');
const Article = require('../models/article');

const article = [
  {
    title: "Climate Change Isn't the End of the World",
    description: "Even if world temperatures rise, the appropriate policy response is still an open question.",
    author: "David R. Henderson and  John H. Cochrane",
    originalSource: "Wall Street Journal",
    grade: [{ type: Schema.Types.ObjectId, ref: 'Grade'}],
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
    //bias: right, business
  //https://www.wsj.com/articles/climate-change-isnt-the-end-of-the-world-1501446277

},

{
  title: "Why is Global Warming a Problem?",
  description: "Fact based information on the dangers of global warming.",
  author: "Holli Riebeek",
  originalSource: "United Nations Intergovernmental Panel on Climate Change",
  grade: [{ type: Schema.Types.ObjectId, ref: 'Grade'}],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
//https://earthobservatory.nasa.gov/blogs/climateqa/why-is-global-warming-a-problem/

},

{
  title: "Climate change’s effects plunder the planet",
  description: "A warming Earth disturbs weather, people, animals and much more",
  author: "Unknown",
  originalSource: "Environmental Defense Fund",
  grade: [{ type: Schema.Types.ObjectId, ref: 'Grade'}],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
//https://www.edf.org/climate/climate-changes-effects-plunder-planet

},

{
  title: "Climate Change is a Business Problem",
  description: "The business agenda",
  author: "Mike Scott",
  originalSource: "Financial Times",
  grade: [{ type: Schema.Types.ObjectId, ref: 'Grade'}],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
  //https://www.ft.com/content/f0dc04ac-df58-11e3-86a4-00144feabdc0
},
  ];

Article.create(article, (err, docs)=>{
  if (err) {
    throw err;
}
  docs.forEach((product)=> {
    console.log(article.name)
});
  mongoose.connection.close();
});
