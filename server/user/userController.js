const User = require('./userModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');
const bcrypt = require('bcryptjs');

const userController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
userController.getAllUsers = (next) => {
  User.find({}, next);
};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.createUser = (req, res, next) => {
  // Validate inputs
  if (!req.body.username || !req.body.password) {
    res.render('./../client/signup', { error: 'Invalid username/password.' });
  }
  // Create model instance to use Model.save();
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save((err, data) => {
    if (err) {
      return res.render('./../client/signup', { error: err });
    }
    // Make mongoose generated ._id available on body object.
    req.body._id = data._id;

    next();
  });
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, data) => {

    if (data === null) {
      return res.redirect('/signup');
    }

    bcrypt.compare(req.body.password, data.password, (err, result) => {
      if (result) {
        req.body._id = data._id;
        next();
      } else return res.redirect('/signup');
    });
  });
};

module.exports = userController;
