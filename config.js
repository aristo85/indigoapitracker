exports.config = {
  mongoUrl: process.env.MONGO_DB ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
};
