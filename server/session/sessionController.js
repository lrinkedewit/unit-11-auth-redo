var Session = require('./sessionModel');
var Cookies = require('cookies');

var sessionController = {};
sessionController.isLoggedIn = isLoggedIn;
sessionController.startSession = startSession;

function isLoggedIn(req, res, next) {
  // write code here

  next();
}

function startSession(cookieId, callback) {
  //write code here

}

module.exports = sessionController;