const User = require("../models/register.model");
const Profile = require("../models/profile.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      user.password = null;
      user.confirmPassword = null;
      const acesstoken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        (err, token) => {
          if (err) {
            console.log(err);
            return res.json({
              success: false,
              error: "Error!",
            });
          } else {
            return res.json({
              success: true,
              data: token,
              error: "",
            });
          }
        }
      );
    } else {
      return res.json({
        success: false,
        error: "Invalid Login Credentials!",
        data: {},
      });
    }
  } catch (error) {
    res.status(404).send({
      data: {},
      success: false,
      error: "Internal server error",
    });
  }
};

exports.register = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    res.status(400).send({
      data: {},
      success: false,
      error: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);

  res.status(200).send({
    data: newUser,
    success: true,
    error: "",
  });
};

exports.getProfile = async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  user.password = null;
  const profile = await Profile.findOne({ user: req.user.username });
  const profileData = {
    user,
    about: profile.about,
    description: profile.description,
  };
  if (profileData) {
    res.status(200).send({
      data: profileData,
      success: true,
      error: "",
    });
  } else {
    res.status(403).send({
      data: {},
      success: false,
      error: "User not found",
    });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(200).send({
      data: profile,
      success: true,
      error: "",
    });
  } catch (err) {
    res.status(400).send({
      data: {},
      success: false,
      error: err,
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    //find profile from schema
    const profile = await Profile.findOne({ user: req.user.username });
    //update profile
    //check if not found
    if (!profile) {
      res.status(404).send({
        data: {},
        success: false,
        error: "Profile not found",
      });
    } else {
      profile.name = req.body.name;
      profile.description = req.body.description;
      profile.about = req.body.about;
      await profile.save();
      res.status(200).send({
        data: profile,
        success: true,
        error: "",
      });
    }
  } catch (err) {
    res.status(400).send({
      data: {},
      success: false,
      error: err,
    });
  }
};

exports.follow = async (req, res) => {
  //get the username of the user who is being followed, so store this
  const follwedUser = await User.findOne({ username: req.body.username });
  //get the username of the user who is following
  const follower = await User.findOne({ username: req.user.username });

  //check if the user is already following the user
  if (
    follower.following.find(
      (friend) => friend.username === follwedUser.username
    )
  ) {
    const x = follower.following.pull({ username: follwedUser.username });
    await follower.save();
    const y = follwedUser.follower.pull({ username: follower.username });
    await follwedUser.save();
    return res.status(200).send({
      data: "Removed",
      success: true,
      error: "",
    });
    //add the follower in the followers array of the user
  } else {
    const x = follower.following.push({ username: follwedUser.username });
    await follower.save();
    const y = follwedUser.follower.push({ username: follower.username });
    await follwedUser.save();
    return res.status(200).send({
      data: "Added",
      success: true,
      error: "",
    });
  }
};

exports.forget = async (req, res) => {
  const { username, birthplace } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    if (user.birthplace === birthplace) {
      res.status(200).send({
        data: {},
        success: true,
        error: "",
      });
    } else {
      res.status(200).send({
        data: {},
        success: false,
        error: "wrong birthplace",
      });
    }
  } else {
    res.status(200).send({
      data: {},
      success: false,
      error: "User Not Found",
    });
  }
};

exports.getUserByName = async (req, res) => {
  //get the users
  const x = req.body.name;
  User.find({ name: { $regex: x, $options: "i" } })
    .then((users) => {
      res.status(200).send({
        data: users,
        success: true,
        error: "",
      });
    })
    .catch((err) => {
      res.status(404).send({
        data: {},
        success: false,
        error: err,
      });
    });
};

exports.getAllUser = async (req, res) => {
  //get All the users whom the loggedUser is not following and can connect
  const user = await User.findOne({ username: req.user.username });
  const followingUsers = user.following.map((obj) => obj.username);
  followingUsers.push(req.user.username);
  User.find({ username: { $nin: followingUsers } })
    .then((users) => {
      res.status(200).send({
        data: users,
        success: true,
        error: "",
      });
    })
    .catch((err) => {
      res.status(404).send({
        data: {},
        success: false,
        error: err,
      });
    });
};

exports.updatePassword = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const user = await User.findOneAndUpdate(
    { username: req.user.username },
    { password: req.body.password }
  );
  if (user) {
    res.status(200).send({
      data: {},
      success: true,
      error: "",
    });
  } else {
    res.status(400).send({
      data: {},
      success: false,
      error: "Password not updated",
    });
  }
};
