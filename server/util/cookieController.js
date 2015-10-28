var Cookies = request('cookies');

var cookieController = {};
cookieController.setCookie = setCookie;

function setCookie(req, res, next) {
  var cookies = new Cookies(req, res);
  cookies.set('codesmith', 'hi');
  cookies.set('secret', Math.round(Math.random() * 99));
  next();
}

