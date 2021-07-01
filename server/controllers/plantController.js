//require in plant from the plantModel
const Plant = require('../models/plantModel');

const plantController = {};

plantController.addPlant = (req, res, next) => {
  Plant.create(
    {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      desc: req.body.desc,
      schedule: req.body.schedule,
    },
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.plant = result;
      return next();
    }
  );
};

plantController.getPlants = (req, res, next) => {
  console.log('inside plant controller');
  Plant.find({}, 'name')
    // .exec()
    .then((plantNames) => {
      // console.log(plantNames.map((el) => el.name));
      res.locals.plantTypes = plantNames.map((el) => el.name);
      return next();
    })
    .catch((err) => {
      next({
        log: `Error in plantController.getPlants, Error Message: ${err}`,
        message: `Error in the plantController.getPlants, check log for details `,
      });
    });
};

plantController.addCustomPlant = (req, res, next) => {
  console.log('inside custom plant controller');
  Plant.create(
    {
      name: req.body.species,
      imageUrl: req.body.image,
      desc: req.body.desc,
      schedule: req.body.sched,
    },
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.plant = result;
      return next();
    }
  );
};

module.exports = plantController;