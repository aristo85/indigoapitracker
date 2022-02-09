const express = require("express");
const {
  createARThing,
  getARThingByUserId,
} = require("../controllers/arThingController");
const isAuth = require("../middleware/isAuth");
const { useValidation } = require("../middleware/validate");
const {
  createARValidationSchema,
} = require("../util/validation/createARValidation");

const router = express.Router();

router.post(
  "/create",
  useValidation(createARValidationSchema),
  isAuth,
  createARThing
);
router.get("/by-userId", isAuth, getARThingByUserId);

module.exports = router;
