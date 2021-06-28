// require in session model after Prasad created it
const Session = require('../models/sessionModel');

const sessionController = {};

// start session stores the current cookie ssid aka the user's id in a separate session controller to verify if a user can access the site
sessionController.startSession = (req, res, next) => {
  console.log('Inside session controller');
  Session.create({ cookieId: res.locals.user.id })
    .then((result) => {
      return next();
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next();
      }
      return next(err);
    });
};

// isLoggedIn - verifies if user is logged in and allows access to /home,
// otherwise it redirects to sign in page which is our root
sessionController.isLoggedIn = (req, res, next) => {
  console.log('Inside IsLoggedIn controller')
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((result) => {
      if (result) {
        return next();
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = sessionController;
