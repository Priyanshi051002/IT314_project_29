const express = require("express");
const { loginfunc, registerfunc } = require("../controllers/register.controller");
const router = express.Router();

router.post("/login", loginfunc);
router.post("/register", registerfunc);
module.exports = router;
