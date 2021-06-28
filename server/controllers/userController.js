// require in user from usermodel
const User = require('../models/userModel');

const userController = {};

// create user

userController.createUser = (req, res, next) => {
  // NOTE: add .pre to user model to hash and use bcrypt on the password before it's sent to the database
  console.log('Inside createUser');

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
        return next({
          log: `Error in userController.createUser, Error Message: ${err}`,
          message: `Error in the userController.createUser, check log for details `,
        });
      }

      res.locals.user = result;
      return next();
    }
  );
};

// verify user
userController.verifyUser = (req, res, next) => {
  console.log(req.body);
  User.findOne({ username: req.body.username })
    .then((user) => {
      // this comparePassword only works when you add the method onto the user model (NOTE: add once I merge with Prasad)
      console.log('Hit verify user');
      console.log(user);
      if (user.comparePassword(req.body.password)) {
        console.log('Comparedpassword worked');
        res.locals.user = user;
        return next();
      } else {
        res.redirect('/signup');
      }
    })
    .catch((err) => {
      return next({
        log: `Error in userController.verifyUser, Error Message: ${err}`,
        message: `Error in the userController.verifyUser, check log for details `,
      });
    });
};


userController.getUserPlants = (req, res, next) => {
  User.findOne({ _id: req.cookies.ssid })
    .then((user) => {
      // find the user and set the resl.locals.user to the user
      res.locals.userPlants = user.plantList;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in userController.findUser, Error Message: ${err}`,
        message: `Error in the userController.findUser, check log for details `,
      });
    });
};


module.exports = userController;
