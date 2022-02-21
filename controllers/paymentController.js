const uuidv4 = require("uuid");
const { config } = require("../config");
const Payment = require("../models/payment");
const stripe = require("stripe")(config.stripeSecretKey);

exports.createPaymentCheckout = async (req, res, next) => {
  const { paymetnMethodType, currency, amount, base_url } = req.body;
  const statusId = uuidv4.v4();
  try {
    const product = await stripe.products.create({ name: "API-call" });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount * 100,
      currency: currency,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [paymetnMethodType],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${base_url}/billing/success?statId=${statusId}`,
      cancel_url: base_url + "/billing/cancel",
    });

    if (session?.id) {
      const createdAt = new Date().getTime();

      const { id, amount_total, expires_at, payment_status } = session;

      const payment = new Payment(
        req.userId,
        id,
        amount_total,
        currency,
        expires_at,
        paymetnMethodType,
        payment_status,
        createdAt,
        statusId
      );
      await payment.save();
    }

    res.status(200).json({ url: session?.url });
    // res.redirect(303, session.url);
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.upadatePaymentStatus = async (req, res, next) => {
  const { statusId } = req.body;
  try {
    const payment = await Payment.findPaymentByStatusId(statusId, req.userId);

    if (!payment) {
      const error = new Error("Wrong statusId!");
      error.statusCode = 401;
      throw error;
    }

    await Payment.updatePaymentStatusByStatusId(statusId, "succeed");
    res.status(200).json({ message: "succeed" });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.fetchAll();
    res.status(200).json(payments);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
