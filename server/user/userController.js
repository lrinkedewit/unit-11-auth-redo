var User = require('./userModel');
var cookieController = require('./../util/cookieController');
var sessionController = require('./../session/sessionController');

var userController = {};
userController.createUser = createUser;
userController.getAllUsers = getAllUsers;
userController.verifyUser = verifyUser;

function createUser(req, res) {
  //write code here

}

function verifyUser(req, res) {
  // write code here
}

function getAllUsers(cb) {
  User.find({}, function(err, users) {
    if (!err) return cb(users);
  });
}

module.exports = userController;