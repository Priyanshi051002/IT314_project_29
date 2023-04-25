const User = require("../models/register.model");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      user.password = null;
      user.confirmPassword = null;
      return res.json({
        success: true,
        data: user,
        error: "",
      });
    } else {
      return res.json({
        success: false,
        error: "Invalid Login Credentials!",
        data: {},
      });
    }
  } catch (error) {
    return res.status(404).send({
      data: {},
      success: false,
      error: "Internal server error",
    });
  }
};

exports.register = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).send("User already registered");
  console.log(req.body);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);

  res.status(201).send({
    data: newUser,
    success: true,
    error: "",
  });
};
