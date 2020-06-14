const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  password_hash: {
    type: String,
    select: false,
  },
  pro: Boolean,
});

User.virtual("password")
  .get(function() {
      return this._password;
  })
  .set(function(val) {
    this._password = val;
    console.log("setting: ", val);
    this.passwordHash = "test";
  });

User.pre('save', async function (next) {
  const user = this;
  if(user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
    next();
  }
})

User.methods.checkPassword = async function(password) {
  const isPasswordValid = await bcrypt.compare(password, this.password_hash);
  return isPasswordValid;
}

module.exports = mongoose.model('User', User);

