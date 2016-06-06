import babel from "gulp-babel";
import uglify from "gulp-uglify";
import gulp from "gulp";
import nodemon from "gulp-nodemon";
import concat from "gulp-concat";
import plumber from "gulp-plumber";
import cssmin from "gulp-cssmin";
import del from "del";
import runSequence from "run-sequence";
import packager from "electron-packager";
import pkg from "./package.json";
import sourcemaps from "gulp-sourcemaps";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
let browserSync = require("browser-sync").create();


gulp.task("default", (callback) => {
  return runSequence("clean", "min", "browser-sync", "watch", callback);
});

gulp.task("browser-sync", ["nodemon"], () => {
  browserSync.init(null, {
    proxy: "http://localhost",
    port: 7000
  });
});

gulp.task("nodemon", (callback) => {
  let called = false;

  return nodemon({
    script: "app.js",
    ext: "js html css jade", // 監視するファイルの拡張子
    ignore: ["./www", "node_modules"]
  })
  .on("start", () => {
    // サーバー起動時
    if (!called) {
      called = true;
      callback();
    }
  })
  .on("restart", () => {
    // サーバー再起動時
    setTimeout(() => {
      browserSync.reload();
    }, 500);
  });
});

// javascriptファイルを圧縮する
gulp.task("js.browserify", [], () => {
  browserify({
    entries: "www/js/src/ng.app.js",
    debug: true
  })
  .transform(babelify.configure({
      //ignore: ['**/lib/**', '**/node_modules/**'],
      presets: ["es2015"]
    })
  )
  .bundle()
  .on("error", function(err){
    console.log("Error : "+err.message);
  })
  .pipe(source("ng.main.js"))
  .pipe(gulp.dest("www/js/browserify/"));
});

// javascriptファイルを圧縮する
gulp.task("js.babel", ["js.browserify"], () => {
  return gulp.src(["www/js/src/*.js", "!www/js/src/ng.*"])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("www/js/babel/"));
});

// AngularJS用のjavascriptファイルをまとめる
gulp.task("js.concat.angular", ["js.babel"], () => {
  return gulp.src(["www/js/babel/ng.*.js", "www/js/babel/ng.*.*.js", "!www/js/babel/ng.main.js"])
    .pipe(plumber())
    .pipe(concat("ng.main.js"))
    .pipe(gulp.dest("www/js/babel/"));
});

// javascriptファイルを圧縮する
gulp.task("js.uglify", ["js.concat.angular"], () => {
  return gulp.src(["www/js/babel/quiz.*.js", "www/js/browserify/ng.main.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("www/js/min/"));
});

// socket.io.jsを圧縮する
gulp.task("js.uglify.socket.io", () => {
  return gulp.src("node_modules/socket.io-client/socket.io.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("www/lib/socket.io/"));
});

// cssファイルを圧縮する
gulp.task("cssmin", () => {
  return gulp.src("www/css/src/*.css")
    .pipe(cssmin())
    .pipe(gulp.dest("www/css/min/"));
});

// 監視して処理するのをひとまとめにしておく。
gulp.task("min", ["js.concat.angular", "js.uglify", "js.uglify.socket.io", "cssmin"]);

// ファイルを監視して実行させる
gulp.task("watch", () => {
  gulp.watch(["www/js/src/*.js", "www/css/src/*.css", "!www/js/src/ng.main.js"], ["min"]);
});

gulp.task("clean", del.bind(null, ["www/js/src/ng.main.js", "www/js/min/*", "www/css/min/*"]));

gulp.task("package", ["clean", "min"], (done) => {
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
  }, (err, path) => {
    if (err) {
      console.error(err);
    }
    console.log(path);
    done();
  });
});
