const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  if (req.cookies.ssid) {
    Session.findOne({ cookieId: req.cookies.ssid }, (err, data) => {
      if (data) next();
      else return res.redirect('/signup');
    });
  } 
  
  else {
    return res.redirect('/signup');
  }
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  if (req.body._id) {
    const newSession = new Session({ cookieId: req.body._id });

    newSession.save((err => {
      if (err) console.log(err);

      next();
    }));
  }
};

module.exports = sessionController;
