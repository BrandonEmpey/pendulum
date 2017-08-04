const express = require("express");
const Article = require("../models/article");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) {
      return next(err);
    }
    res.render("index", {
      articles: articles,
      user: req.user
    });
  });
});

module.exports = router;
