var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/quiz.db');

function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) {  // 認証済
    return next();
  }
  else {  // 認証されていない
    res.redirect('/login');  // ログイン画面に遷移
  }
}

router.get('/config/', isAuthenticated, function(req, res, next) {
  res.render('users/config', {
    pretty: true
  });
});

router.get('/:id', isAuthenticated, function(req, res, next) {
  db.serialize(function(){
    db.all("SELECT id, password, firstname, lastname, createtime, updatetime FROM users WHERE id=?", req.params.id, function(err, rows){
      if (!err) {
        res.locals.userdata = rows[0];
        res.render('users/single', {
          data: rows[0],
          pretty: true
        });
      }
      else {
        console.log(err);
      }
    });
  });
});

module.exports = router;