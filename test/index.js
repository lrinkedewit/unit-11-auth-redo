var request = require('supertest');
var app = require('./../server/server');
var expect = require('chai').expect;
var Cookies = require('cookies');
var Session = require('./../server/session/sessionModel');
var User = require('./../server/user/userModel');
var bcrypt = require('bcryptjs');
var sinon = require('sinon');

describe('Unit 11 Tests', function() {
  
  var id;
  var clock;
  
  before(function() {
    clock = sinon.useFakeTimers();
  });
  
  beforeEach(function(done) {
    
    User.remove({}, function() {
      Session.remove({}, function() {
        
        User.create({
          username: 'david',
          password: 'aight'
        }, function(err, user){
          id = user.id;
          done();
        });
        
      });
    });
    
    
  });
  
  after(function() {
    clock.restore();
  });
  
  describe('Creating users', function() {
    
    it('POST request to "/signup" route with correctly formatted body creates a user', function(done) {
      request(app)
        .post('/signup')
        .send({"username": "test1", "password" : "password1"})
        .type('form')
        .end(function(err, res) {
          User.findOne({username: 'test1'}, function(err, user) {
            expect(err).to.be.null;
            expect(user).to.be.truthy;
            done();
          });
        });
    });

    it('POST request to "/signup" route with incorrectly formatted body should redirect to "/signup" with an error message', function(done) {
      request(app)
        .post('/signup')
        .send({"username": "test2"})
        .type('form')
        .end(function(err, res) {
          expect(res.text.match(/Error/)).to.not.be.null;
          done();
        });
    });
    
    it('POST request to "/signup" route with incorrectly formatted body does not create a new User', function(done) {
      request(app)
        .post('/signup')
        .send({ username: 'test2' })
        .type('form')
        .end(function(err, res) {
          User.findOne({ username: 'test2' }, function(err, user) {
            expect(user).to.not.exist;
            done();
          });
        });
    });
    
  });
  
  describe('Authenticating users', function() {

    it('POST request to "/login" route with correctly formated correct information redirects to "/secret"', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ username: 'david', password: 'aight' })
        .end(function(err, res) {
          expect(res.headers.location).to.eql('/secret');
          done();
        });
    });

    it('POST request to "/login" route with incorrect password redirects to "/signup"', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ 'username': 'david', password: 'incorrect' })
        .end(function(err, res) {
          expect(res.headers.location).to.eql('/signup');
          done();
        });
    });
    
    it('POST request to "/login" route with non-existent user redirects to "/signup"', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ 'username': 'idontexist', password: 'aight' })
        .end(function(err, res) {
          expect(res.headers.location).to.eql('/signup');
          done();
        });
    });

  });

  describe('Cookies', function() {
    
    it('Header has cookie name of "codesmith"', function(done) {
      request(app)
        .get('/')
        .expect('set-cookie',/codesmith=/, done);
    });

    it('"codesmith" cookie has value of "hi"', function(done) {
      request(app)
        .get('/')
        .expect('set-cookie',/hi/, done);
    });

    it('Header has a cookie name "secret"', function(done) {
      request(app)
        .get('/')
        .expect('set-cookie', /secret=/, done);
    });

    it('"secret" cookie has a random value from 0-99', function(done) {
      var oldNumber;
      var newNumber;
      var cookies;
      request(app)
        .get('/')
        .end(function(err, res) {
          oldNumber = getCookie(res.headers['set-cookie'],'secret');
          request(app)
            .get('/')
            .end(function(err, res) {
              newNumber = getCookie(res.headers['set-cookie'],'secret');
              expect(newNumber).to.be.within(0,99);
              expect(oldNumber).to.be.within(0,99);
              expect(newNumber).to.not.eql(oldNumber);
              done();
            });
        });
    });

    it('Header has a cookie named "ssid" when a user successfully logins', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ username: 'david', password: 'aight' })
        .expect('set-cookie', /ssid=/, done);
    });
    
    it('Header has a cookie named "ssid" when a user successfully signs up', function(done) {
      request(app)
        .post('/signup')
        .type('form')
        .send({ username: 'newuser', password: 'cool' })
        .expect('set-cookie', /ssid=/, done);
    });

    it('"ssid" cookie has value of user', function(done) {
      var regex = new RegExp(id);
      request(app)
        .post('/login')
        .type('form')
        .send({ username: 'david', password : 'aight' })
        .expect('set-cookie', regex, done);
    });
    
  });

  describe('Sessions', function() {
    
    it('Creates a session when a user successfully creates an account', function(done) {
      request(app)
        .post('/signup')
        .type('form')
        .send({username: 'test2', password: 'password2'})
        .end(function(err, res) {
          User.findOne({ username: 'test2' }, function(err, user) {
            Session.findOne({cookieId: user._id}, function(err, session) {
              expect(err).to.be.null;
              expect(session).to.exist;
              done();
            });
          });
        });
    });

    it('Creates a session when a user successfully logins to an account', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({username: 'david', password: 'aight'})
        .end(function(err, res) {
          User.findOne({username: 'david'}, function(err, user) {
            Session.findOne({cookieId: user._id}, function(err, session) {
              expect(err).to.be.null;
              expect(session).to.exist;
              done();
            });
          });
        });
    });
    
    it('Does not create a session if login unsuccessful', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ username: 'david', password: 'wrong password' })
        .end(function(err, res) {
          User.findOne({ username: 'david' }, function(err, user) {
            Session.findOne({ cookieId: user._id }, function(err, session) {
              expect(err).to.be.null;
              expect(session).to.not.exist;
              done();
            });
          });
        });
    });
    
  });

  describe('Authorizing users', function() {
    
    it('Block "/secret" if session not active', function(done) {
     request(app)
       .get('/secret')
       .end(function(err, res) {
        expect(res.text).to.not.include('Secret');
        expect(res.text).to.not.include('david');
        done();
       });
    });
    
    it('Redirects from "/secret" to "/signup" if session not active', function(done) {
     request(app)
       .get('/secret')
       .end(function(err, res) {
        expect(res.text).to.contain('Signup');
        expect(res.headers.location).to.eql('/signup');
        done();
       });
    });
    
    it('Allows access to "/secret" if session active', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ username: 'david', password: 'aight' })
        .end(function(err, res) {
          request(app)
            .get('/secret')
            .expect(200)
            .end(function(err, res) {
              expect(err).to.not.exist;
              // expect(res.headers.location).to.eql('/secret');
              expect(res.text).to.contain('Secret');
              expect(res.text).to.contain('david');
              done();
            });
        });
    });
    
    it('Should not be able to access "/secret" after session expires', function(done) {
      request(app)
        .post('/login')
        .type('form')
        .send({ username: 'david', password: 'aight' })
        .end(function(err, res) {
          Session.remove({ cookieId: id }, function(err, session) {
            
            request(app)
              .get('/secret')
              .end(function(err, res) {
                expect(res.text).to.contain('Signup');
                expect(res.headers.location).to.eql('/signup');
                done();
              });
              
          });
        });
    });
    
  });

  describe('Bcrypting passwords', function() {
    
    it('Passwords should not be stored in plaintext', function(done) {
      request(app)
        .post('/signup')
        .send({"username": "test3", "password" : "password3"})
        .type('form')
        .end(function(err, res) {
          User.findOne({username: 'test3'}, function(err, user) {
            expect(user.password).to.not.eql('password3');
            done();
          });
        });
    });

    it('Passwords be bcrypted', function(done) {
      request(app)
        .post('/signup')
        .send({ username: 'test4', password: 'password4' })
        .type('form')
        .end(function(err, res) {
          User.findOne({username: 'test4'}, function(err, user) {
            expect(bcrypt.compareSync('password4',user.password)).to.be.true;
            done();
          });
        });
    });
  });
  
});

function getCookieValue(cookie) {
  return cookie[0].split(';')[0].split('=')[1];
}

function getCookie(cookieArray, name) {
  return getCookieValue(cookieArray.filter(function(el) {
    return el.split(';')[0].split('=')[0] === name;
  }));
}
