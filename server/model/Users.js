const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  fullName : String,

  refreshToken: String,
},{timestamps : true});

module.exports = mongoose.model("F1_User", userSchema);
