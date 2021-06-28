const User = require('../models/userModel');
const Plant = require('../models/plantModel');
const moment = require('moment');

const userPlantController = {};

//************Helper Functions Start********************//

//get the schedule denomination (days or weeks, assuming it's one of them)
//for e.g. if schedule is '1 to 2 days' --> expect 'days'
//for e.g. if schedule is '1 to 2 weeks' --> expect 'weeks'
const getSchedulePeriod = (schedule) => {
  if (/days/.test(schedule)) return 'days';
  if (/weeks/.test(schedule)) return 'weeks';
};

//for e.g. if schedule is '1 to 2 days' --> expect freq = 2
const getScheduleFreq = (schedule) => {
  return Number(schedule.match(/(\d+)/g).slice(-1).pop());
};

const getNextWaterDate = (lastWaterDate, schedule) => {
  //make a clone of the last WateredDate
  let nextWaterDate = lastWaterDate.clone();

  //Compute the nextWaterDate from the lastWaterDate & watering schedule
  nextWaterDate.add(getScheduleFreq(schedule), getSchedulePeriod(schedule));

  return nextWaterDate;
};

//************Helper Functions End********************//

//add a new Plant
userPlantController.addPlant = async (req, res, next) => {
  try {
    //get the plant name from the req body
    //query the Plants collection from db for the plant
    console.log('Inside add Plant controller');
    console.log('Cookie ID: ', req.cookies.ssid);

    const plant = await Plant.findOne({ name: req.body.planttype });
    console.log('Plant is: ', plant);
    const user = await User.findOne({ _id: req.cookies.ssid });
    console.log(user);

    //get the watering schedule from the plant database
    const { schedule } = plant;
    //get the current Plant list from the User
    const userPlants = [...user.plantList];

    // get the name, healthInfo & lastWatered info from the request body
    const { nickname, planttype, healthInfo, lastWatered } = req.body;

    let lastWaterDate, nextWaterDate;
    if (lastWatered) {
      //convert the lastWatered info to a Date obj
      lastWaterDate = moment(lastWatered);
      nextWaterDate = getNextWaterDate(lastWaterDate, schedule);
    }

    //assemble the new plant Info

    const newPlant = {
      nickname,
      planttype,
      healthInfo,
      schedule,
      lastWaterDate,
      nextWaterDate,
      plantInfo: plant,
    };

    console.log('The new Plant is : ', newPlant);

    userPlants.push(newPlant);
    console.log(userPlants);

    //update the user collection with the new plant
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.cookies.ssid },
      { plantList: userPlants },
      { new: true }
    );

    res.locals.user = userUpdated;
    return next();
  } catch (error) {
    return next({
      log: `Error in userPlantController.addPlant, Error Message: ${error}`,
      message: `Error in the userPlantController.addPlant, check log for details `,
    });
  }
};

userPlantController.updatePlant = async (req, res, next) => {
  try {
    //update database with the plant info specific to user for 2 scenarios:
    // watering update
    // plant healthInfo update

    const user = await User.findOne({ _id: req.cookies.ssid });

    const userPlants = [...user.plantList];

    // get the name, healthInfo & lastWatered info from the request body
    const { nickname, planttype, healthInfo, lastWatered } = req.body;

    const plant = await Plant.findOne({ name: req.body.planttype })

    const userplant = userPlants.find((el) => el.nickname === nickname);
    const plantIndex = userPlants.findIndex((el) => el.nickname === nickname);

    const { schedule, lastWaterDate, nextWaterDate } = userplant;

    let newLastWaterDate, newNextWaterDate;
    console.log(lastWaterDate, typeof lastWaterDate);

    //check if lastWaterDate exists --> if not set it to the lastWatered (if avaialble)
    if (!lastWaterDate && lastWatered) {
      newLastWaterDate = moment(lastWatered);
      newNextWaterDate = undefined;
    }
    //lastWaterDate exists in the database and user doesn't update the lastWatered date --> the update is related to plant health
    if (lastWaterDate && moment(lastWaterDate).isSame(moment(lastWatered))) {
      newLastWaterDate = moment(lastWaterDate).clone();
      newNextWaterDate = moment(nextWaterDate).clone();
    }

    //lastWaterDate exists in the database and user updates the lastWatered date --> update is related to Watering update + (optionally) plant health update
    if (lastWaterDate && !moment(lastWaterDate).isSame(moment(lastWatered))) {
      newLastWaterDate = moment(lastWatered);
      newNextWaterDate = getNextWaterDate(newLastWaterDate, schedule);
      console.log(
        'Inside case when user provides a new lastWaterDate',
        newLastWaterDate,
        newNextWaterDate
      );
    }

    //assemble the updates to the plant (specific to user)
    const updatedPlant = {
      nickname,
      planttype,
      healthInfo,
      schedule,
      healthInfo,
      lastWaterDate: newLastWaterDate,
      nextWaterDate: newNextWaterDate,
      plantInfo: plant,      
    };

    //replace the updated plant info in the user plants list

    console.log('Plant: ', userplant);
    console.log('Updated Plant: ', updatedPlant);

    console.log('Before: ', userPlants);
    console.log('Plant Index: ', plantIndex);

    userPlants.splice(plantIndex, 1, updatedPlant);
    console.log('After: ', userPlants);

    //update the user collection with the updated Plant info
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.cookies.ssid },
      { plantList: userPlants },
      { new: true }
    );

    res.locals.user = userUpdated;
    console.log(res.locals.user.plantList[0].plantInfo)
    return next();
  } catch (error) {
    return next({
      log: `Error in userPlantController.updatePlant, Error Message: ${error}`,
      message: `Error in the userPlantController.updatePlant, check log for details `,
    });
  }
  //const
};

//deletePlant
userPlantController.deletePlant = async (req, res, next) => {
  try {
    //update database with the plant watering update / plant healthInfo update

    const user = await User.findOne({ _id: req.cookies.ssid });

    const userPlants = [...user.plantList];
    //console.log()

    // get the name, healthInfo & lastWatered info from the request body
    const { nickname, planttype} = req.body;

    //get the plant and index of the plant (from the user.plantList array) matching plant nickname the req body nickname
    const plant = userPlants.find((el) => el.nickname === nickname);
    const plantIndex = userPlants.findIndex((el) => el.nickname === nickname);

    //delete the plant at the index

    userPlants.splice(plantIndex, 1);

    //update the user collection with the updated Plant info
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.cookies.ssid },
      { plantList: userPlants },
      { new: true }
    );

    res.locals.user = userUpdated;
    return next();
  } catch (error) {
    return next({
      log: `Error in userPlantController.deletePlant, Error Message: ${error}`,
      message: `Error in the userPlantController.deletePlant, check log for details `,
    });
  }

  //const
};

module.exports = userPlantController;
