const User = require("../models/register.model");
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
  if (user) {
    return res.status(200).send({
      data: user,
      success: true,
      error: "",
    });
  } else {
    return res.status(403).send({
      data: {},
      success: false,
      error: "User not found",
    });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { name, description, about } = req.body;

    const profile = new Profile();
    profile.user = req.user.username;
    profile.name = name;
    profile.description = description;
    profile.about = about;

    await profile.save();
    return res.status(200).send({
      data: profile,
      success: true,
      error: "",
    });
  } catch (err) {
    return res.status(400).send({
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
      return res.status(404).send({
        data: {},
        success: false,
        error: "Profile not found",
      });
    } else {
      profile.name = req.body.name;
      profile.description = req.body.description;
      profile.about = req.body.about;
      await profile.save();
      return res.status(200).send({
        data: profile,
        success: true,
        error: "",
      });
    }
  } catch (err) {
    return res.status(400).send({
      data: {},
      success: false,
      error: err,
    });
  }
};

exports.follow = async (req, res) => {
  //get the username of the user who is being followed
  const follwedUser = req.body.username;
  //get the username of the user who is following
  const follower = req.user.username;

  //check if the user is already following the user

  //add the follower in the followers array of the user
  const x = await User.findOneAndUpdate(
    { username: follwedUser },
    { $push: { followers: follower } },
    { new: true }
  )
    .then((result) => {
      res.status(200).send({
        data: result,
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

  //add the user in the following array of the follower
  const y = await User.findOneAndUpdate(
    { username: follower },
    { $push: { following: follwedUser } },
    { new: true }
  )
    .then((result) => {
      res.status(200).send({
        data: result,
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

exports.unfollow = async (req, res) => {
  //get the username of the user who is being unfollowed
  const unfollwedUser = req.body.username;
  //get the username of the user who is unfollowing
  const unfollower = req.user.username;

  //delete the unfollower in the followers array of the user
  const Updatedfolloweduser = await User.findOneAndUpdate(
    { username: unfollwedUser },
    { $pull: { followers: unfollower } },
    { new: true }
  )
    .then((result) => {
      res.status(200).send({
        data: result,
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

  //delete the user in the following array of the unfollower
  const UpdatedfollowedrserUser = await User.findOneAndUpdate(
    { username: unfollower },
    { $pull: { following: unfollwedUser } },
    { new: true }
  )
    .then((result) => {
      res.status(200).send({
        data: result,
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

exports.forget = async (req, res) => {
  const { username, birthplace } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    if (user.birthplace === birthplace) {
      return res.status(200).send({
        data: {},
        success: true,
        error: "",
      });
    } else {
      return res.status(200).send({
        data: {},
        success: false,
        error: "wrong birthplace",
      });
    }
  } else {
    return res.status(200).send({
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
      return res.status(200).send({
        data: users,
        success: true,
        error: "",
      });
    })
    .catch((err) => {
      return res.status(404).send({
        data: {},
        success: false,
        error: err,
      });
    });
};

exports.getUser = async (req, res) => {
  //get All the users

  User.find({})
    .then((users) => {
      return res.status(200).send({
        data: users,
        success: true,
        error: "",
      });
    })
    .catch((err) => {
      return res.status(404).send({
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
    { username: req.body.username },
    { password: req.body.password }
  );
  return res.status(200).send({
    data: {},
    success: true,
    error: "",
  });
};
