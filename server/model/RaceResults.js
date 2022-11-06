const mongoose = require("mongoose");

const RaceResult = new mongoose.Schema({
  roundNo: String,
  podiums: [String],
});

const RaceResultsByYear = new mongoose.Schema({
  year: String,
  results: [RaceResult],
});

module.exports = mongoose.model("F1_RaceResults", RaceResultsByYear);
