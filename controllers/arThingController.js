const ARThing = require("../models/arThing");

exports.createARThing = async (req, res, next) => {
  const createdAt = new Date().getTime();
  // const {name, }
  try {
    const isARthing = await ARThing.findByName(req.body.name);

    if (isARthing) {
      const error = new Error("data with this name already exist");
      error.statusCode = 422;
      throw error;
    }
    const arthing = new ARThing(req.body.name, createdAt, req.userId);
    const result = await arthing.save();
    res.status(201).json({ message: "ARThing created", result });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.getARThingByUserId = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    const arthing = await ARThing.findARThingByUserId(userId);
    if (!arthing) {
      const error = new Error("this user doesnt have an AR.");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json(arthing);
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};
