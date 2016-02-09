var User = require('./userModel');
var cookieController = require('./../util/cookieController');
var sessionController = require('./../session/sessionController');

var userController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
userController.getAllUsers = function(next) {
  User.find({}, next);
};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
*/
userController.createUser = function(req, res) {
  // write code here
  
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
*/
userController.verifyUser = function(req, res) {
  // write code here
};

module.exports = userController;
