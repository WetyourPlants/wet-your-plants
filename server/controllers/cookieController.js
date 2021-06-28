const cookieController = {};

// after user is created or verified after a login, we grab the id from the database and save it in a cookie for authentication
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('Inside cookie controller')
  res.cookie('ssid', res.locals.user.id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
