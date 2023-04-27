const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthplace: {
    type: String,
    required: true,
  },
  following: {
    type: [{ username: String }],
    required: false,
  },
  follower: {
    type: [{ username: String }],
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
