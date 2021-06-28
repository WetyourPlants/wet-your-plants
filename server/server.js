const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//import required controllers
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');
const userPlantController = require('./controllers/userPlantController');
const plantController = require('./controllers/plantController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//define and connect to database
//currently set to local database: need to be replaced with Cloud (mongo Atlas) server??
const mongoURI =
  'mongodb+srv://wet-your-plants:plants2021@cluster0.iounu.mongodb.net/wetYourPlants?retryWrites=true&w=majority';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'wetYourPlants',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/home/getPlants', userController.getUserPlants, (req, res) => {
  //need to render the landing page with the following json passed as to the get request
  console.log('inside /home/getPlants');
  console.log(res.locals.userPlants);
  return res.status(200).json({
    plantList: res.locals.userPlants,
    // dbplantTypes: res.locals.plantTypes,
  });
});

app.get('/home', sessionController.isLoggedIn, (req, res) => {
  console.log('inside get home');
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// need to check if logged in via session controller
//get the UserPlant details along with the list of Plants Types from the database

// need to check if logged in via session controller
//need to modify this to send the  user data along with the landing page???

// login route to verify user exists in database, set ssid cookie, start session,
// and then it redirects to the /home landing page
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,

  (req, res) => {
    console.log('Right before home');
    res.status(200).json(true);
  }
);

// create user in database, set ssid cookie, start session

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.redirect('/home');
  }
);

// add Plant to user collection in the database
app.post(
  '/adduserplant',
  sessionController.isLoggedIn,
  userPlantController.addPlant,
  (req, res) => {
    res.redirect('/home/getPlants');
  }
);

// update Plant to user collection in the database
app.patch(
  '/updateuserplant',
  sessionController.isLoggedIn,
  userPlantController.updatePlant,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

// delete Plant from the User Plant collection in the database
app.delete(
  '/deleteuserplant',
  sessionController.isLoggedIn,
  userPlantController.deletePlant,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
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

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
