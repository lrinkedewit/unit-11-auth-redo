var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./user/userModel');
var mongoose = require('mongoose');
var userController = require('./user/userController');
var cookieController = require('./util/cookieController');
var sessionController = require('./session/sessionController');
var mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/test' : 'mongodb://localhost/myApp';
mongoose.connect(mongoURI);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

app.post('/signup', userController.createUser);

app.get('/', cookieController.setCookie, function(req, res) {
  res.render('./../client/index');
});

app.get('/signup', function(req, res) {
  res.render('./../client/signup', {error: null});
});

app.post('/login', userController.verifyUser);

app.get('/secret', sessionController.isLoggedIn, function(req, res) {
  userController.getAllUsers(function(users) {
    res.render('./../client/secret', { users: users });
  });
});

app.listen(3000);

module.exports = app;