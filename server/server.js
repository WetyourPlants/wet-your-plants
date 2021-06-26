const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')

//import required controllers
const userController = require('./controllers/userController')
const sessionController = require('./controllers/sessionController')
const cookieController = require('./controllers/cookieController')

//define and connect to database
  //currently set to local database: need to be replaced with Cloud (mongo Atlas) server??
const mongoURI = "mongodb://localhost/wetYourPlants";
mongoose.connect(mongoURI)

PORT = 3000;

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

module.exports = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
