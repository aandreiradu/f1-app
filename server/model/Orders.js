const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersModel = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  users: {
    email: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "F1_User",
    },
  },
});

module.exports = mongoose.model("F1_Orders", OrdersModel);
