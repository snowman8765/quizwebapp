var express = require('express');
var router = express.Router();
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var sqlite3 = require('sqlite3').verbose();
var debug_db = new sqlite3.Database('data/debug.db');
var db = new sqlite3.Database('data/quiz.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { pretty: true });
});

router.get('/about', function(req, res, next) {
  console.log(req.path);
  res.render('about', { pretty: true });
});

router.get('/info', function(req, res, next) {
  console.log(req.path);
  res.render('info', { pretty: true });
});

router.get('/login', function(req, res, next) {
  res.render('login', { pretty: true });
});

router.post('/login', function(req, res, next) {
  res.redirect("/home");
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { pretty: true });
});

router.post('/signup', function(req, res, next) {
  res.redirect("/home");
});

router.get('/home', function(req, res, next) {
  res.render('home', { pretty: true });
});

router.get('/userconfig', function(req, res, next) {
  res.render("userconfig", { pretty: true });
});

router.get('/logout', function(req, res, next) {
  res.redirect("/");
});

module.exports = router;
