var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  user: {type: String, required: true},
  password: {type: String, required: true}
});

userSchame.pre('save', function(next) {
  var user = this;

  // put code here
  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  user.password = bcrypt.hashSync(user.password, salt);
  next();

});

app.get('/users', userController.getAllUsers);
