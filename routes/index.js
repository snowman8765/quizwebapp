var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res) {
  res.render('index', {
    user: req.user,
    pretty: true
  });
});

router.get('/about', function(req, res) {
  res.render('about', {
    user: req.user,
    pretty: true
  });
});

router.get('/info', function(req, res) {
  res.render('info', {
    user: req.user,
    pretty: true
  });
});

module.exports = router;
