var User = require('./userModel');
var cookieController = require('./../util/cookieController');
var sessionController = require('./../session/sessionController');

var userController = {};
userController.createUser = createUser;
userController.getAllUsers = getAllUsers;
userController.verifyUser = verifyUser;

function createUser(req, res) {

  // to remove
  console.log(req.body);
  User.create(req.body, function(err, user) {
    if (!err) {
      sessionController.startSession(user._id, function() {
        res.redirect('/secret');
      });
    } else {
      res.render('./../client/signup', {error: err});
    }
  });
}

function verifyUser(req, res) {
  User.findOne(req.body.username, function(err, user) {
    if (user && user.password === req.body.password) {
      cookieController.setSSIDCookie(req, res, user._id);
      // sessionController.startSession(user._id, function() {
      return res.redirect('/secret');
      // });
    } else {
      return res.render('./../client/signup', {error: err});
    }
  });
}

function getAllUsers(cb) {
  User.find({}, function(err, users) {
    if (!err) return cb(users);
  });
}

module.exports = userController;