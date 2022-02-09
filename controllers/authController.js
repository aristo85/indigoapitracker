const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

exports.singup = async (req, res, next) => {
  const { username, email, password, name, wallet } = req.body;
  const createdAt = new Date().getTime();

  try {
    const isUser = await User.findByEmailUsernameWallet(
      email,
      username,
      wallet
    );

    if (isUser) {
      const error = new Error(
        "User with this email or wallet or username already exist"
      );
      error.statusCode = 422;
      throw error;
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User(username, email, hashedPass, name, wallet, createdAt);
    const result = await user.save();
    const token = jwt.sign(
      {
        email: email,
        userId: result._id,
      },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOneUserByEmail(email);

    if (!foundUser) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isCorrectPass = await bcrypt.compare(password, foundUser.password);

    if (!isCorrectPass) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: foundUser.email,
        userId: foundUser._id,
      },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: foundUser._id });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};
