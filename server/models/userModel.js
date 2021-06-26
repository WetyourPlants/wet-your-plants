const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  phone: String,
  plantList: [
    {
      name: { type: String },
      healthinfo: { type: String },
    },
  ],
});

userSchema.pre('save', function (next) {
  if (this.password) {
    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
