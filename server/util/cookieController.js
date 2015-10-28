var Cookies = require('cookies');
var sessionController = require('./../session/sessionController');

var cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

function setCookie(req, res, next) {
  //write code here

}

function setSSIDCookie(req, res, id) {
  // write code here

}

module.exports = cookieController;