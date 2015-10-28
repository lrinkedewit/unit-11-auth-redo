var Session = require('./sessionModel');
var Cookies = require('cookies');

var sessionController = {};
sessionController.isLoggedIn = isLoggedIn;
sessionController.startSession = startSession;

function isLoggedIn(req, res, next) {
  var cookies = new Cookies(req, res);
  if (!cookies.get('ssid')) {
    return res.render('./../client/signup', {error: 'not loggedin'});
  }

  //to remove
  Session.findOne({'cookieId' : cookies.get('ssid')}, function(err, session) {
    if (!err) {
      return next();
    }
    return res.render('./../client/signup', {error: err});
  });



}

function startSession(cookieId, callback) {

  // to remove
  console.log('starting sessiono');
  Session.update({cookieId: cookieId}, {upsert: true}, function(err,s) {
    if (!err) {
      console.log(s);
      return callback();
    }
    console.log('error creating session',err);
  });
}

module.exports = sessionController;