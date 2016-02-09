const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');

var app = express();

const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);

/**
* Set our Express view engine as ejs.
* This means whenever we call res.render, ejs will be used to compile the template.
* ejs templates are located in the client/ directory
*/
app.set('view engine', 'ejs');

/**
* Automatically parse urlencoded body content from incoming requests and place it
* in req.body
*/
app.use(bodyParser.urlencoded({ extended: true }));

/**
* Routes
*/
app.post('/signup', userController.createUser);

app.get('/', function(req, res) {
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
