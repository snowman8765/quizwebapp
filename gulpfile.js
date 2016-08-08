"use strict";

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var cssmin = require("gulp-cssmin");
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync").create();
var del = require("del");
var runSequence = require("run-sequence");

gulp.task("default", function(callback) {
  return runSequence("clean", "min", "browser-sync", "watch", callback);
});

gulp.task("browser-sync", ["nodemon"], function() {
  browserSync.init({
    proxy: "http://localhost:8080"
  });
});

gulp.task("nodemon", function(cb) {
  var called = false;

  return nodemon({
      script: "app.js",
      ext: "js html css jade", // 監視するファイルの拡張子
      ignore: ["./www", "node_modules"]
    })
    .on("start", function() {
      // サーバー起動時
      if (!called) {
        called = true;
        cb();
      }
    })
    .on("restart", function() {
      // サーバー再起動時
      setTimeout(function() {
        browserSync.reload();
      }, 500);
    });
});

// AngularJS用のjavascriptファイルをまとめる
gulp.task("js.concat.angular", function() {
  return gulp.src(["www/js/src/ng.*.js", "www/js/src/ng.*.*.js", "!www/js/src/ng.main.js"])
    .pipe(plumber())
    .pipe(concat("ng.main.js"))
    .pipe(gulp.dest("www/js/src/"));
});

// javascriptファイルを圧縮する
gulp.task("js.uglify", ["js.concat.angular"], function() {
  return gulp.src("www/js/src/*.js")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(uglify())
    .pipe(sourcemaps.write("./", { includeContent: false, sourceRoot: '../src/' }))
    .pipe(gulp.dest("www/js/min/"));
});

// socket.io.jsを圧縮する
gulp.task("js.uglify.socket.io", function() {
  return gulp.src("node_modules/socket.io-client/socket.io.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("www/lib/socket.io/"));
});

// cssファイルを圧縮する
gulp.task("cssmin", function() {
  return gulp.src("www/css/src/*.css")
    .pipe(cssmin())
    .pipe(gulp.dest("www/css/min/"));
});

// 監視して処理するのをひとまとめにしておく。
gulp.task("min", ["js.concat.angular", "js.uglify", "js.uglify.socket.io", "cssmin"]);

// ファイルを監視して実行させる
gulp.task("watch", function() {
  gulp.watch(["www/js/src/*.js", "www/css/src/*.css", "!www/js/src/ng.main.js"], ["min"]);
});

gulp.task("clean", del.bind(null, ["www/js/src/ng.main.js", "www/js/min/*", "www/css/min/*"]));

gulp.task("package", ["clean", "min"], function(done) {
  var packager = require("electron-packager");
  var pkg = require("./package.json");
  packager({
    dir: "./",
    out: "./releases",
    name: pkg.name,
    arch: "ia32",
    platform: "win32",
    version: "1.2.0",
    icon: "",
    overwrite: true,
    asar: false,
    //prune: true,
    "app-version": pkg.version,
    ignore: []
  }, function(err, path) {
    if (err) {
      console.error(err);
    }
    console.log(path);
    done();
  });
});