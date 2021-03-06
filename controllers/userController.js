const User = require("../models/user");

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.updateUser(req.userId, req.body.name);
    res.status(201).json(user);
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("A user with this ID could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const {
      _id,
      username,
      email,
      name,
      wallet,
      createdAt,
      apiTracker,
      accessKey,
    } = user;
    res.status(200).json({
      _id,
      username,
      email,
      name,
      wallet,
      createdAt,
      apiTracker,
      accessKey,
    });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.getUserByWallet = async (req, res, next) => {
  const walletAddress = req.query.walletAddress;
  try {
    const user = await User.findByWallet(walletAddress);
    if (!user) {
      const error = new Error("A user with this wallet could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const { _id, username, email, name, wallet, createdAt } = user;
    res.status(200).json({ _id, username, email, name, wallet, createdAt });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const usrname = req.query.username;
  try {
    const user = await User.findByUsername(usrname);
    if (!user) {
      const error = new Error("A user with this username could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const { _id, username, email, name, wallet, createdAt } = user;
    res.status(200).json({ _id, username, email, name, wallet, createdAt });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.upadateUserApiTracker = async (req, res, next) => {
  console.log(req.body);
  const { type, route, accessKey, accountId } = req.body;
  const createdAt = new Date().getTime();
  try {
    const user = await User.findUserByAccessKey(accessKey, accountId);

    if (!user) {
      const error = new Error("Wrong Access-code!");
      error.statusCode = 401;
      throw error;
    }

    if (user.apiTracker?.length > 50) {
      const error = new Error("Max API call exceeded");
      error.statusCode = 403;
      throw error;
    }

    await User.updateUserApikeyTracker(accessKey, {
      type,
      route,
      createdAt,
    });
    res.status(200).json({ message: "succeed" });
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    next(error);
  }
};

exports.updateApiTrackerDates = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const resp = user.apiTracker.map((el) => ({
      ...el,
      createdAt: el.createdAt + req.body.addTimeToAll,
    }));
    const result = await User.updateAPITrackerDate(req.userId, resp);
    res.status(200).json(result);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// exports.getUsers = async (req, res, next) => {
//     try {
//       const users = await User.fetchAll();
//       res.status(200).json(users);
//     } catch (error) {
//       error.statusCode = 500;
//       next(error);
//     }
//   };

// exports.getUserByAny = async (req, res, next) => {
//   const { email, username, wallet } = req.query;
//   console.log('data===>', email, username, wallet)
//   try {
//     const user = await User.findByEmailUsernameWallet(email, username, wallet);
//     res.status(200).json(user);
//   } catch (error) {
//     error.statusCode = 500;
//     next(error);
//   }
// };
