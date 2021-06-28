// require in user from usermodel
const User = require('../models/userModel');

const userController = {};

// create user

userController.createUser = (req, res, next) => {
  // NOTE: add .pre to user model to hash and use bcrypt on the password before it's sent to the database
  User.create(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      plantList: [],
    },
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.user = result;
      return next();
    }
  );
};

// verify user
userController.verifyUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      // this comparePassword only works when you add the method onto the user model (NOTE: add once I merge with Prasad)
      console.log('Hit verify user');
      if (user.comparePassword(req.body.password)) {
        console.log('Comparedpassword worked');
        res.locals.user = user;
        return next();
      } else {
        res.redirect('/signup');
      }
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = userController;
