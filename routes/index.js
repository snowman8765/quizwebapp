var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/quiz.db');

router.use('/*', function(req, res, next) {
  //console.log(req);
  next();
});

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

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

passport.use(new LocalStrategy({usernameField: "userid", passwordField: "password"}, function(userid, password, done) {
  console.log("check login.");
  db.get('SELECT createtime as salt FROM users WHERE id = ?', userid, function(err, row) {
    if (!row) {
      return done(null, false, {message: "ユーザーが見つかりませんでした。"});
    }
    console.log("find user.");
    var hash = hashPassword(password, row.salt);
    db.get('SELECT id, firstname, lastname, createtime, updatetime FROM users WHERE id = ? AND password = ?', userid, hash, function(err, row) {
      if (!row) {
        return done(null, false, {message: "パスワードが間違っています。"});
      }
      console.log("login ok.:id="+row.id);
      return done(null, row);
    });
  });
}));

passport.serializeUser(function(user, done) {
  console.log("serializeUser:id="+user.id);
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser:id="+id);
  db.get('SELECT id, firstname, lastname, createtime, updatetime FROM users WHERE id = ?', id, function(err, row) {
    if (!row) {
      return done(null, false);
    }
    return done(null, row);
  });
});

router.get('/login', function(req, res, next) {
  console.log("get /login:"+req.user);
  res.render('login', { pretty: true });
});

router.post('/login',
  passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: '/login'
  })
);

router.get("/logout", function(req, res){
  console.log("get /logout:"+req.id);
  //console.log(req);
  req.logout();
  res.redirect("/");
});

module.exports = router;
