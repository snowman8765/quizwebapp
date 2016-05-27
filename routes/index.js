var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/index", function(req, res) {
  res.render("index");
});

router.get("/about", function(req, res) {
  res.render("about");
});

router.get("/info", function(req, res) {
  res.render("info");
});

module.exports = router;
