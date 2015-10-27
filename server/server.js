var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({
  genid: function() {
    return 'there';
  },
  name: 'wow',
  secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, './../client')));


app.listen(3000);

module.exports = app;