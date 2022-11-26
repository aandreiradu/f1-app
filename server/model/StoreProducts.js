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
  },
  { timestamps: true }
);

module.exports = mongoose.model("f1_products", productSchema);
