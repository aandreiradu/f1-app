const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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

    roles: {
      User: {
        type: Number,
        default: 971206,
      },

      Admin: {
        type: Number,
      },

      Host: {
        type: Number,
      },
    },
    fullName: String,
    favoriteDriver: String,
    favoriteConstructor: String,

    profileImageName : {
      type : String
    },
    profileImage: {
      contentType : String,
      data: Buffer
    },

    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("F1_User", userSchema);
