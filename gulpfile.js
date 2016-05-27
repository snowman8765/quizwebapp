var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var del = require("del");
var runSequence = require("run-sequence");
var cssmin = require("gulp-cssmin");

function reload() {
  browserSync.reload({ stream: false });
};

gulp.task("default", function(callback) {
  return runSequence("clean", "min", "serve", "watch", callback);
});

gulp.task("browsersync", function() {
  browserSync.init({
    files: ["www/**/*.*", "views/**/*.*"], // BrowserSyncにまかせるファイル群
    proxy: "http://localhost",  // express の動作するポートにプロキシ
    port: 4000,  // BrowserSync は 4000 番ポートで起動
    open: false
  });
});

gulp.task("serve", ["browsersync"], function () {
  nodemon({ 
    script: "app.js",
    ext: "js html css",
    ignore: [  // nodemon で監視しないディレクトリ
      "node_modules",
      "bin",
      "views",
      "www",
      "test"
    ],
    env: {
      "NODE_ENV": "development"
    },
    stdout: false  // Express の再起動時のログを監視するため
  }).on("readable", function() {
  this.stdout.on("data", function(chunk) {
  if (/^Express\ server\ listening/.test(chunk)) {
        // Express の再起動が完了したら、reload() でBrowserSync に通知。
        // ※Express で出力する起動時のメッセージに合わせて比較文字列は修正
        reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on("data", function(chunk) {
      process.stderr.write(chunk);
    });
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
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("www/js/min/"));
});

// cssファイルを圧縮する
gulp.task("cssmin", function () {
  return gulp.src("www/css/src/*.css")
    .pipe(cssmin())
    .pipe(gulp.dest("www/css/min/"));
});

// 監視して処理するのをひとまとめにしておく。
gulp.task("min", ["js.concat.angular", "js.uglify", "cssmin"]);

// ファイルを監視して実行させる
gulp.task("watch", function() {
  gulp.watch(["www/js/src/*.js", "www/css/src/*.css"], ["min"]);
});

gulp.task("clean", del.bind(null, ["www/js/src/ng.main.js", "www/js/min/*", "www/css/min/*"]));

gulp.task("package", ["clean", "min"], function (done) {
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
  }, function (err, path) {
    if (err) {
      console.error(err);
    }
    console.log(path);
    done();
  });
});