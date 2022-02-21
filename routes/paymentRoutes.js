const express = require("express");
const {
  createPaymentCheckout,
  upadatePaymentStatus,
  getPayments,
} = require("../controllers/paymentController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/create-payment-intent", isAuth, createPaymentCheckout);
router.patch("/succeed", isAuth, upadatePaymentStatus);
router.get("", isAuth, getPayments);

module.exports = router;
