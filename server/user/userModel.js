const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) console.log(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return console.log('error', err);
      
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
