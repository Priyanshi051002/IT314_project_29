const express = require("express");
const { login, register, profile } = require("../controllers/user.controller");
const router = express.Router();
const authenticateToken = require("../middlewares/passport");

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authenticateToken, profile);

module.exports = router;
