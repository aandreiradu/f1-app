const mongoose = require("mongoose");
const RaceBetsModel = require("./BetRace");
const Schema = mongoose.Schema;

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

    imageUrl: String,

    refreshToken: [String],

    resetToken: String,
    resetTokenExpiration: Date,

    raceBets: [RaceBetsModel],

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
