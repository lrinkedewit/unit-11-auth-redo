var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
}

// userSchema.pre('save', function(next) {
//   var user = this;
//   console.log('saveing');

//   // put code here
//   var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
//   user.password = bcrypt.hashSync(user.password, salt);
//   console.log('next');
//   return next();

// });

module.exports = mongoose.model('User', userSchema);