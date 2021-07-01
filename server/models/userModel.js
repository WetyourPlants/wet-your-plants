const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  plantList: [
    {
      nickname: { type: String, unique: true },
      planttype: { type: String },
      healthInfo: { type: String },
      schedule: { type: String },
      lastWaterDate: { type: Date },
      nextWaterDate: { type: Date },
      imageUrl: { type: String },
      desc: { type: String },
      plantInfo: {
        type: Schema.Types.ObjectId,
        ref: 'plant',
      },
    },
  ],
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    if (err) console.log(err);
    user.password = hash;
    return next();
  });
});
userSchema.methods.comparePassword = function (potentialPass) {
  const user = this;
  return bcrypt.compare(potentialPass, user.password);
};

module.exports = mongoose.model('User', userSchema);