const express = require("express");
const {
  getUserById,
  getUserByWallet,
  getUserByUsername,
  updateUser,
  upadateUserApiTracker,
  updateApiTrackerDates,
  //   getUserByAny,
  //   getUsers,
} = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - username
 *         - email
 *         - name
 *         - wallet
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id (account-ID)
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         wallet:
 *           type: string
 *         accessKey:
 *           type: string
 *           description: access-code
 *       example:
 *         id: 123464
 *         title: anyTitle
 *         name: anyname
 *         email: anyemail
 *         username: anyusername
 *         wallet: anywallet
 *         accessKey: asdfasdf1231a3sdf
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: the User managing APIs
 */

/**
 * @swagger
 * /api/Users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns user's account
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Current user's account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 */
router.get("", isAuth, getUserById);
router.get("/user-by-wallet", isAuth, getUserByWallet);
router.get("/user-by-username", isAuth, getUserByUsername);
router.patch("/update-name", isAuth, updateUser);
router.patch("/api-tracker", upadateUserApiTracker);
router.put("/tracker-dates", isAuth, updateApiTrackerDates);

module.exports = router;
