const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param next - Callback with signature ([err])
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here

  next();
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
* @param cookieId - id to use as the id of the new session
* @param callback - Callback with signature (Session)
*/
sessionController.startSession = (cookieId, callback) => {
  //write code here

};

module.exports = sessionController;
