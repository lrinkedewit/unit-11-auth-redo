var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
