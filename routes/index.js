var express = require('express');
var router = express.Router();

router.use('/*', function(req, res, next) {
  //console.log(req);
  next();
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', {
    user: req.user,
    path: req.path,
    pretty: true
  });
});

router.get('/about', function(req, res, next) {
  console.log(req.path);
  res.render('about', {
    user: req.user,
    path: req.path,
    pretty: true
  });
});

router.get('/info', function(req, res, next) {
  console.log(req.path);
  res.render('info', {
    user: req.user,
    path: req.path,
    pretty: true
  });
});

module.exports = router;
