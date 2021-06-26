const express = require('express');
const app = express();
const path = require('path');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

PORT = 3000;

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// check if logged in via session controller
app.get('/home', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// login route to verify user exists in database, set ssid cookie, start session,
// and then it redirects to the /home landing page
app.post('/login', (req, res) => {
  res.redirect('/home');
});

// create user in database, set ssid cookie, start session
app.post('/signup', (req, res) => {});

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
