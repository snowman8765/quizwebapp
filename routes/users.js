var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("data/quiz.db");
var moment = require("moment");

var SQL_USER_COLUMN = "id, displayname, firstname, lastname, createtime, updatetime";
var SQL_USER_COLUMN_WITH_PASSWORD = SQL_USER_COLUMN+", password";

function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) {  // 認証済
    console.info("isAuthenticated: OK.");
    return next();
  } else {  // 認証されていない
    console.error("isAuthenticated: NG.");
    res.send({isAuth:false});
    //res.redirect("/users/login");  // ログイン画面に遷移
  }
}

router.get("/", function(req, res) {
  console.log("/users/");
  res.redirect("/home");
});

router.get("/home", isAuthenticated, function(req, res) {
  console.log("/users/home");
  //console.log(res);
  res.render("users/home");
});

router.get("/config", isAuthenticated, function(req, res) {
  console.log("/users/config");
  res.render("users/config");
});

router.route("/signup")
.get(function(req, res) {
  console.log("/users/signup get");
  res.locals.result = {
    input_id: "",
    input_password: "",
    message: ""
  };
  res.render("users/login");
})
.post(function(req, res) {
  console.log("/users/signup post");
  console.log(req.body);
  var userid = req.body.userid;
  var password = req.body.password;
  var currenttime = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  var salt = currenttime;
  var result = {
    input_id: userid,
    input_password: password
  };
  console.log(currenttime);
  
  if(userid=="" || password=="") {
    result.flag = false;
    result.message = "入力にミスがあります。";
  } else {
    db.serialize(function(){
      db.get("SELECT * FROM users WHERE id=?", userid, function(err, row) {
        console.log("post signup:search userid.");
        console.log(row);
        if (row) {
          console.log("find user.");
          result.flag = false;
          result.message = "指定のIDのユーザがすでに存在しています。";
        } else {
          var hash = hashPassword(password, salt);
          console.log("post signup:insert user.");
          db.run("INSERT INTO users (id, displayname, password, firstname, lastname, createtime, updatetime) VALUES (?,?,?,?,?,?,?)", userid, userid, hash, "", "", currenttime, currenttime);
          result.flag = true;
          result.message = "登録しました。";
          console.log("signup ok.:id="+userid);
        }
      });
    });
  }
  
  //res.redirect("/users/home");
  //console.log(result);
  res.send(result);
});

router.route("/login")
.get(function(req, res) {
  console.log("/users/login get");
  res.locals.result = {
    input_id: "",
    input_password: "",
    message: ""
  };
  res.render("users/login");
})
.post(passport.authenticate("local"), function(req, res) {
  console.log("/users/login post");
  var result = {};
  
  if(req.user) {
    result = {
      input_id: req.user.id,
      input_password: req.user.password,
      message: "ログインしました。",
      flag: true,
      displayname: req.user.displayname
    };
  } else {
    result = {
      input_id: "",
      input_password: "",
      message: "ログインに失敗しました。",
      flag: false
    };
  }
  res.send(result);
});

router.get("/logout", isAuthenticated, function(req, res){
  console.log("/users/logout");
  req.logout();
  res.send("success logout.");
});

router.get("/:id", isAuthenticated, function(req, res) {
  console.log("/users/:id");
  db.serialize(function(){
    db.get("SELECT "+SQL_USER_COLUMN+" FROM users WHERE id=?", req.params.id, function(err, rows){
      if (!err) {
        res.locals.data = rows;
        res.render("users/single");
      }
      else {
        console.log(err);
      }
    });
  });
});

function hashPassword(password, salt) {
  var hash = crypto.createHash("sha256");
  hash.update(password);
  hash.update(salt);
  return hash.digest("hex");
}

passport.use(new LocalStrategy({usernameField: "userid", passwordField: "password"}, function(userid, password, done) {
  console.log("check login.");
  db.get("SELECT createtime as salt FROM users WHERE id=?", userid, function(err, row) {
    if (!row) {
      return done(null, false, {
        message: "ユーザーが見つかりませんでした。"
      });
    }
    console.log("find user.");
    var hash = hashPassword(password, row.salt);
    db.get("SELECT "+SQL_USER_COLUMN_WITH_PASSWORD+" FROM users WHERE id=? AND password=?", userid, hash, function(err, row) {
      if (!row) {
        console.error("login error.:id="+userid);
        return done(null, false, {
          message: "パスワードが間違っています。",
          input_id: userid,
          input_password: password
        });
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
  db.get("SELECT "+SQL_USER_COLUMN+" FROM users WHERE id=?", id, function(err, row) {
    if (!row) {
      return done(null, false);
    }
    return done(null, row);
  });
});

module.exports = router;
