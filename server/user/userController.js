var User = require('./userModel');

var userController = {};
userController.createUser = createUser;
userController.getAllUsers = getAllUsers;

function createUser(req, res) {

  // to remove
  console.log(req.body);
  User.create(req.body, function(err, user) {
    console.log('wowowow');
    console.log(err);
    console.log(user);
    if (!err) return res.redirect('/secret');
  });
}

function getAllUsers(cb) {
  User.find({}, function(err, users) {
    if (!err) return cb(users);
  });
}

module.exports = userController;