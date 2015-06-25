console.log('hello world');
var express = require('express');
var app = express();

var config = require('./config');
require('./router/main')(app);


app.set('views',__dirname + '/views');
app.set('view_engine','ejs');
app.engine('html',require('ejs').renderfile);
app.use(express.static('public'));

var server = app.listen(config.port, '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
  console.log("Press Ctrl+C to quit.");
});
