const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductItemModel = new Schema({
  productId: Schema.Types.ObjectId,
  title: String,
  price: Number,
  imageUrl: String,
  teamId: Schema.Types.ObjectId,
  size: String,
  quantity: Number,
});

const OrdersModel = new Schema({
  products: [
    {
      product: { type: ProductItemModel, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  user: {
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
  payment_status: {
    type: String,
    default: "Pending",
  },
  stripeSession: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("F1_Orders", OrdersModel);
