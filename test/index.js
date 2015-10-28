var request = require('supertest');
var app = require('./../server/server');
var chai = request('chai');
var Cookies = require('cookies');


describe('Authentication', function() {
  describe('Cookies',function() {
    it('Header has cookie name of "codesmith"', function(done) {
      request(app)
        .get('/')
        .expect('set-cookie',/codesmith=/, done)
    });

    it('"Codesmith" cookie has value of "hi"', function(done) {
      request(app)
        .get('/')
        .expect('set-cookie',/hi/, done);
    });

    it('Header has a cookie name "secret"', function(done) {
      request(app)
        .get('/')
        .expect('set-cookie', /secret=/, done)
    });

    it('"Secret" cookie has a random value from 0-99', function(done) {
      var oldNumber;
      var cookies;
      request(app)
        .get('/')
        .end(function(err, res) {
          cookies = new Cookies(res);
          console.log(cookies);
          console.log(cookies.get('secret'));
          done();
        });
    });



  })
});

function getCookie(headers, name) {
  return headers['set-cookie']
}