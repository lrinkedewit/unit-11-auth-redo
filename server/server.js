const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');

const app = express();

const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',
cookieController.setCookie,
(req, res) => {
  res.render('./../client/index');
});

app.get('/signup', (req, res) => {
  res.render('./../client/signup', {error: null});
});

app.post('/signup',
userController.createUser,
cookieController.setSSIDCookie,
sessionController.startSession,
(req, res) => {
  res.redirect('/');
});

app.post('/login',
userController.verifyUser,
cookieController.setSSIDCookie,
sessionController.startSession,
(req, res) => {
  res.redirect('/secret');
});

app.get('/secret',
sessionController.isLoggedIn,
(req, res) => {
  userController.getAllUsers((err, users) => {
    if (err) throw err;

    res.render('./../client/secret', { users: users });
  });
});

app.listen(3000);

module.exports = app;
