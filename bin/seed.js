const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost/pendulum");
const Article = require("../models/article");

const articles = [
  {
    title: "Climate Change Isn't the End of the World",
    description:
      "Even if world temperatures rise, the appropriate policy response is still an open question.",
    author: "David R. Henderson and  John H. Cochrane",
    originalSource: "Wall Street Journal",
    link:
      "https://www.wsj.com/articles/climate-change-isnt-the-end-of-the-world-1501446277"
    //bias: right, business
  },

  {
    title: "Climate change’s effects plunder the planet",
    description:
      "A warming Earth disturbs weather, people, animals and much more",
    author: "Unknown",
    originalSource: "Environmental Defense Fund",
    link: "https://www.edf.org/climate/climate-changes-effects-plunder-planet"
  },

  {
    title: "A Compelling Case for Globalization",
    description: "An argument for free trade",
    author: "Wharton Partners",
    originalSource: "University of Pennsylvania",
    link:
      "http://knowledge.wharton.upenn.edu/article/a-compelling-case-for-globalization/"
  },

  {
    title: "Our Finite World",
    description: "An argument against free trade",
    author: "Gail Tverberg",
    originalSource: "Our Finite World",
    link:
      "https://ourfiniteworld.com/2013/02/22/twelve-reasons-why-globalization-is-a-huge-problem/"
  },

  {
    title: "FBI vs Apple: When Security and Privacy Collide",
    description: "Increasing Privacy",
    author: "Bianna Golodryga",
    originalSource: "Huffington Post",
    link:
      "http://www.huffingtonpost.com/bianna-golodryga/fbi-vs-apple-when-securit_b_9577620.html"
  },

  {
    title: "Safety is More Important than Privacy",
    description: "The importance of safety",
    author: "Ron Iphofen",
    originalSource: "Times Higher Education",
    link:
      "https://www.timeshighereducation.com/features/safety-is-more-important-than-privacy"
  }
];

Article.remove({}, function(err) {
  if (err) {
    console.log("ERROR", err);
  }
  Article.create(articles, (err, docs) => {
    if (err) {
      throw err;
    }
    docs.forEach(doc => {
      console.log(doc.title);
    });
    mongoose.connection.close();
  });
});
