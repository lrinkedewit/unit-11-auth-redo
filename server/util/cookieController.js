
var sessionController = require('./../session/sessionController');

var cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

/**
* setCookie - set a cookie with a random number
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setCookie(req, res, next) {
  //write code here

}

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param rs - http.ServerResponse
* @param id - id of the cookie to set
*/
function setSSIDCookie(req, res, id) {
  // write code here

}

module.exports = cookieController;
