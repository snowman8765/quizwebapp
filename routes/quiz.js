var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var debug_db = new sqlite3.Database('data/debug.db');
var db = new sqlite3.Database('data/quiz.db');

router.get('/', function(req, res, next) {
  db.serialize(function(){
    db.all("SELECT * FROM table_count", function(err, rows){
      if (!err) {
        res.render('quiz/index', {
          result: rows,
          pretty: true
        });
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get('/book/:id/', function(req, res, next) {
  db.serialize(function(){
    db.all("SELECT id, title, comment, createtime, updatetime, q_genre_id, q_genre_title, q_genre_comment FROM book_genre WHERE id="+req.params.id, function(err, rows){
      if (!err) {
        res.render('quiz/book_detail', {
          list: rows,
          pretty: true
        });
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get('/genre/list', function(req, res, next) {
  db.serialize(function(){
    db.all("SELECT id, title, comment, createtime, updatetime FROM q_genre", function(err, rows){
      if (!err) {
        res.render('quiz/genre_list', {
          list: rows,
          pretty: true
        });
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get('/genre/:id/', function(req, res, next) {
  db.serialize(function(){
    db.all("SELECT id, title, comment, createtime, updatetime, q_genre_id, q_genre_title, q_genre_comment FROM book_genre WHERE q_genre_id="+req.params.id, function(err, rows){
      if (!err) {
        res.render('quiz/genre_detail', {
          list: rows,
          pretty: true
        }); 
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get('/single/:id/', function(req, res, next) {
  db.serialize(function(){
    db.get("SELECT id, title, comment, createtime, updatetime, type, select1, select2, select3, select4, select5, select6 FROM q_single WHERE id="+req.params.id, function(err, rows){
      if (!err) {
        res.render('quiz/single', {
          data: rows,
          pretty: true
        });
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get('/single/answer/:id/', function(req, res, next) {
  db.serialize(function(){
    db.get("SELECT id, title, comment, createtime, updatetime, answer, type, select1, select2, select3, select4, select5, select6 FROM q_single WHERE id="+req.params.id, function(err, rows){
      if (!err) {
        res.json(rows);
      }
      else {
        console.log(err);
      }
    });
  });
});

module.exports = router;
