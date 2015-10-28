var Cookies = require('cookies');
var sessionController = require('./../session/sessionController');

var cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

function setCookie(req, res, next) {
  var cookies = new Cookies(req, res);
  cookies.set('codesmith', 'hi');
  cookies.set('secret', Math.round(Math.random() * 99));
  next();
}

function setSSIDCookie(req, res, id) {
  var cookies = new Cookies(req, res);
  cookies.set('ssid', id);
}

module.exports = cookieController;