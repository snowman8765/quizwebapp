var express = require('express');
var app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  console.log('app.all.*:');
  next();
});

// API Routes
// app.get('/blah', routeHandler);
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.all('/', function (req, res, next) {
  console.log('app.all.top:');
});
app.all('/tab', function (req, res, next) {
  console.log('app.all.tab:');
});
app.all('/#/tab', function (req, res, next) {
  console.log('app.all.#.tab:');
});

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('my.db');

db.serialize(function() {
  //db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();
