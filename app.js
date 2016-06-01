var express = require("express");
var path = require("path");
var moment = require("moment");
var sqlite3 = require("sqlite3").verbose();
var logDB = new sqlite3.Database("data/logs.db");

// アプリケーションの設定
var app = express();
var compression = require('compression');
app.use(compression({level: 6}));

// 表示の設定
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.locals.pretty = true;

// デフォルトの設定
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "www", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "www")));

// セッションや認証の設定
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
app.use(session({
  secret: "secret snowman",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
  console.log("app.use /*:session");
  console.log(req);
  if(req.user) {
    console.log("set request user.");
    res.locals.user = req.user;
  } else if(req.session.user) {
    console.log("set session user.");
    res.locals.user = req.session.user;
  } else {
    res.locals.user = {};
  }
  next();
});

// アクセスログの設定
app.use(function(req, res, next){
  var millisec = moment().valueOf();
  var time = moment(millisec).format("YYYY-MM-DD HH:mm:ss").toString();
  var user = req.session.user ? req.session.user.id : "guest";
  var query = JSON.stringify(req.query);
  logDB.run("INSERT INTO log (time, action, user, ip, url, query, milliseconds) VALUES (?,?,?,?,?,?,?)", time, req.path, user, req.ip, req.originalUrl, query, millisec);
  next();
});

// ルーティングの設定
var index = require("./routes/index");
var users = require("./routes/users");
var quiz = require("./routes/quiz");
app.use("/v", index);
app.use("/v/users", users);
app.use("/v/quiz", quiz);
app.get("/*", function(req, res) {
  console.log("get /.");
  console.log(req.session.user);
  res.render("layout/index");
});

// エラー関連の設定
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


// サーバの設定
var debug = require("debug")("quizwebapp2:server");
var http = require("http");

var port = normalizePort(process.env.PORT || 80);
app.set("port", port);

var server = http.createServer(app);

// socket.ioの設定
var io = require("socket.io")(server);
io.on("connection", function (socket) {
  console.log("connection.");
  
  socket.on("login", function(msg){
    console.log("socket:login:"+msg);
    io.emit("broadcast", msg+"さんがログインしました。");
  });
  
  socket.on("message", function(msg){
    console.log("socket:message:"+msg);
    io.emit("message", msg);
  });
  
  socket.on("chat home message", function(msg){
    msg.time = moment().format("MM月DD日 HH時mm分ss秒").toString();
    io.emit("chat home message", msg);
  });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/** Normalize a port into a number, string, or false. */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/** Event listener for HTTP server "error" event. */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**  Event listener for HTTP server "listening" event. */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);
}
