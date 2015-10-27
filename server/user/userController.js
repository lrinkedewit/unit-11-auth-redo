var User = require('./userModel');

var userController = {};

userController.getAllUsers = getAllUsers;

function getAllUsers(req, res) {
  User.find({}, function(err, users) {
    res.send(users);
  });
}

module.exports = userController;