const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  description: {
    type: String,
    maxlength: 100,
  },
  about: {
    type: String,
    maxlength: 500,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;