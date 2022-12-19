const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    details: {
      type: [String],
    },

    price: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "F1_User",
      required: true,
    },

    sizeAndAvailability: [
      {
        size: {
          type: String,
          required: true,
        },
        availability: {
          type: Number,
          required: true,
        },
      },
    ],

    teamId: {
      type: Schema.Types.ObjectId,
      ref: "f1_teams",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1_products", productSchema);
