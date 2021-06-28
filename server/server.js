const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose')

//import required controllers
const userController = require('./controllers/userController')
const sessionController = require('./controllers/sessionController')
const cookieController = require('./controllers/cookieController')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//define and connect to database
  //currently set to local database: need to be replaced with Cloud (mongo Atlas) server??
const mongoURI = "mongodb://localhost/wetYourPlants";
mongoose.connect(mongoURI)



PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// need to check if logged in via session controller
app.get('/home', sessionController.isLoggedIn, (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// login route to verify user exists in database, set ssid cookie, start session,
// and then it redirects to the /home landing page
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.redirect('/home');
  }
);

// create user in database, set ssid cookie, start session
app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {}
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log('Error: ', errObj.log);
  res.status(errObj.status).send(errObj.message);
});

module.exports = app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
