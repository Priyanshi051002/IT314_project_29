const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	
	followers : [String],
	following : [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
