const express = require("express");
const {
  login,
  register,
  getProfile,
  createProfile,
  editProfile,
  follow,
  unfollow,
  forget,
  updatePassword,
  getAllUser,
  getUserByName,
} = require("../controllers/user.controller");
const router = express.Router();
const authenticateToken = require("../middlewares/passport");

router.post("/login", login);
router.post("/register", register);
router.get("/getProfile", authenticateToken, getProfile);
router.post("/createProfile", authenticateToken, createProfile);
router.put("/editProfile", authenticateToken, editProfile);
router.post("/follow", authenticateToken, follow);
router.post("/unfollow", authenticateToken, unfollow);
router.post("/forget", forget);
router.post("/updatepassword", updatePassword);
router.get("/getAllUser", authenticateToken, getAllUser);
router.post("/getUserByName", authenticateToken, getUserByName);
module.exports = router;
