const express = require("express");
const { singup, login } = require("../controllers/authController");
const { useValidation } = require("../middleware/validate");
// const { resetPassValidationSchema } = require('../utils/validation/resetPassValidation');
const {
  singupValidationSchema,
} = require("../util/validation/signupValidation");

const router = express.Router();

router.put("/signup", useValidation(singupValidationSchema), singup);

router.post("/login", login);

// router.post('/forgotpass/createcode', createResetCode)

// router.put('/forgotpass/resetpass', useValidation(resetPassValidationSchema), passwordReset)

module.exports = router;
