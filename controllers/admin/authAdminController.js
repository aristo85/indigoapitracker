const bcrypt = require("bcryptjs");
const User = require("../../models/user");

exports.singupAdmin = async (email) => {
  const createdAt = new Date().getTime();

  try {
    const isUser = await User.findOneUserByEmail(email);

    if (isUser) return;

    const hashedPass = await bcrypt.hash("indadmin", 12);
    const user = new User(
      null,
      email,
      hashedPass,
      null,
      null,
      null,
      createdAt,
      "admin"
    );
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

// exports.loginAdmin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const foundUser = await User.findOneUserByEmail(email);

//     if (!foundUser) {
//       const error = new Error("A user with this email could not be found.");
//       error.statusCode = 401;
//       throw error;
//     }

//     const isCorrectPass = await bcrypt.compare(password, foundUser.password);

//     if (!isCorrectPass) {
//       const error = new Error("Wrong password!");
//       error.statusCode = 401;
//       throw error;
//     }

//     const token = jwt.sign(
//       {
//         email: foundUser.email,
//         userId: foundUser._id,
//       },
//       config.jwtSecret,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ token, userId: foundUser._id });
//   } catch (error) {
//     error.statusCode = error.statusCode ?? 500;
//     next(error);
//   }
// };
