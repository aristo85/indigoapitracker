const express = require("express");
const {
  getUserById,
  getUserByWallet,
  getUserByUsername,
  updateUser,
  upadateUserApiTracker,
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
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: the User managing APIs
 */

/**
 * @swagger
 * /api/Users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns user's account
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: Object
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("", isAuth, getUserById);
router.get("/user-by-wallet", isAuth, getUserByWallet);
router.get("/user-by-username", isAuth, getUserByUsername);
router.patch("/update-name", isAuth, updateUser);
router.patch("/api-tracker", upadateUserApiTracker);

module.exports = router;
