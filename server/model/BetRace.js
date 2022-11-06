const mongoose = require("mongoose");

const BetResult = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});

const BetRaceSchema = new mongoose.Schema(
  {
    podium: [BetResult],

    year: {
      type: String,
      required: true,
    },

    roundNo: {
      type: String,
      required: true,
    },

    raceName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = BetRaceSchema;
