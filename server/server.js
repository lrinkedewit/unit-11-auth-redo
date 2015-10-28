var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./user/userModel');
var mongoose = require('mongoose');
var userController = require('./user/userController');
var isAuthenticated = require('./util/authController.js');
var cookieController = require('./util/cookieController');

app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost')

// to remove
// app.use(bodyParser());
// app.use(cookieParser());
// app.use(session({
//   genid: function() {
//     return 'there';
//   },
//   name: 'wow',
//   secret: 'keyboard cat'
// }));

app.post('/users', userController.createUser);

app.get('/', generateCookies, function(req, res) {
  res.render('./../client/index');
});

app.get('/signup', isAuthenticated, function(req, res) {
  res.render('./../client/signup');
});

app.get('/secret', function(req, res) {
  userController.getAllUsers(function(users) {
    res.render('./../client/secret', {
      users: users
    });
  });
});

app.listen(3000);

module.exports = app;