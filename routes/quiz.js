var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("data/quiz.db");

router.get("/", function(req, res) {
  var query = "SELECT * FROM table_count";
  db.serialize(function(){
    db.all(query, function(err, rows){
      if (!err) {
        res.locals.result = rows;
        res.render("quiz/index");
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/book/list", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, q_genre_id, q_genre_title, q_genre_comment FROM book_genre WHERE id=?";
  db.serialize(function(){
    db.all(query, req.params.id, function(err, rows){
      if (!err) {
        res.locals.list = rows;
        res.render("quiz/book_list");
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/book/one/:id", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, q_genre_id, q_genre_title, q_genre_comment FROM book_genre WHERE id=?";
  db.serialize(function(){
    db.get(query, req.params.id, function(err, rows){
      if (!err) {
        res.json(rows);
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/book/start", function(req, res) {
  res.render("quiz/book_start");
});

router.get("/book/start/:id", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, q_single_id, q_single_title, q_single_comment, answer, type, select1, select2, select3, select4, select5, select6, q_single_createtime, q_single_updatetime FROM book_quiz WHERE id=?";
  db.serialize(function(){
    db.all(query, req.params.id, function(err, rows){
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/genre/list", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime FROM q_genre";
  db.serialize(function(){
    db.all(query, function(err, rows){
      if (!err) {
        res.locals.list = rows;
        res.render("quiz/genre_list");
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/genre/one", function(req, res) {
  res.render("quiz/genre_detail");
});

router.get("/genre/one/:id", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, q_genre_id, q_genre_title, q_genre_comment FROM book_genre WHERE q_genre_id=?";
  db.serialize(function(){
    db.all(query, req.params.id, function(err, rows){
      if (!err) {
        res.json(rows);
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/single/list", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, q_type_title FROM single_quiz";
  db.serialize(function(){
    db.all(query, function(err, rows){
      if (!err) {
        res.locals.list = rows;
        res.render("quiz/single_list");
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/single/one/:id", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, type, select1, select2, select3, select4, select5, select6 FROM q_single WHERE id=?";
  db.serialize(function(){
    db.all(query, req.params.id, function(err, rows){
      if (!err) {
        res.json(rows);
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/single/start", function(req, res) {
  res.render("quiz/single_start");
});

router.get("/single/start/:id", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, type, select1, select2, select3, select4, select5, select6 FROM q_single WHERE id=?";
  db.serialize(function(){
    db.all(query, req.params.id, function(err, rows){
      if (!err) {
        res.json(rows);
      }
      else {
        console.log(err);
      }
    });
  });
});

router.get("/single/answer/:id", function(req, res) {
  var query = "SELECT id, title, comment, createtime, updatetime, answer, type, select1, select2, select3, select4, select5, select6 FROM q_single WHERE id=?";
  db.serialize(function(){
    db.get(query, req.params.id, function(err, rows){
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
