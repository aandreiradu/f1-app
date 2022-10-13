const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CircuitModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  available_tickets: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Circuit", CircuitModel);

const PackageModel = new Schema({
  packageType: {
    type: String,
    default: "Bronze",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  circuit_id: { type: Schema.Types.ObjectId, ref: "Circuit" },
});

module.exports = mongoose.model("Package", PackageModel);

const SeatModel = new Schema({
  package_id: {
    type: Schema.Types.ObjectId,
    ref: "Package",
  },
  seat_row: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Seat", SeatModel);

const OrdersModel = new Schema({
  firstname: {
    type: "String",
    required: true,
  },
  lastname: {
    type: "String",
    required: true,
  },
  tickets_number: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Orders", OrdersModel);

const TicketsModel = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "Orders",
  },
  circuit_id: {
    type: Schema.Types.ObjectId,
    ref: "Circuit",
  },
  package_id: {
    type: Schema.Types.ObjectId,
    ref: "Package",
  },
  seat_id: {
    type: Schema.Types.ObjectId,
    ref: "Seat",
  },
});

module.exports = mongoose.model("Tickets", TicketsModel);
