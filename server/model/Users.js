const mongoose = require("mongoose");
const RaceBetsModel = require("./BetRace");
const Schema = mongoose.Schema;
const SECURITY_ROLES = require("../config/securityRolesList");

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
        default: SECURITY_ROLES.User,
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

    imageUrl: String,

    refreshToken: [String],

    resetToken: String,
    resetTokenExpiration: Date,

    raceBets: [RaceBetsModel],

    favoriteProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "f1_products",
          required: true,
        },
      },
    ],

    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("F1_User", userSchema);
