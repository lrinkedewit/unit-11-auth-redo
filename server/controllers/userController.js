const User = require('../models/userModel');

const userController = {};


// {
//   username: [String]
//   password: [String]
// }


/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  // write code here
  try {
    const newuser = {
      username: req.body.username,
      password: req.body.password
    }
    User.create((newuser), (err, user) => {
      if (err) {
        res.locals.error = err
        return next();
      }
      res.locals.id = user.id;
      res.locals.user = user;
      return next();

    })
  } catch (err) {
    console.log('Error in userController.createUser', err);
    return res.status(500).send(err.message)
  }
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  try {
    const finduser = {
      username: req.body.username,
      password: req.body.password
    };
    User.find(finduser, function (err, docs) {
      if (!docs[0]) {
        res.locals.error = 'The password for this user is incorrect!';
        return next();
      }
      // if (docs)
      console.log(docs)
      return next()
    })
  } catch (err) {
    console.log('Error in userController.verifyUser', err);
    return res.status(500).send(err.message);
  }

};

module.exports = userController;
