const mongoose = require("mongoose");

const DriverOnPodiumSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
});

const BetRaceSchema = new mongoose.Schema(
  {
    // podium: [DriverOnPodiumSchema],
    podium: [String],

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

// BetRaceSchema.pre("validate", (next) => {
//   if (this.podium.length > 3) {
//     throw "Podium exceeds maximum array size (10)!";
//   }

//   next();
// });

module.exports = BetRaceSchema;
