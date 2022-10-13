const mongoose = require("mongoose");

const QualyfingResultItem = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  qualyDate: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  driverFirstName: {
    type: String,
    required: true,
  },
  driverLastName: {
    type: String,
    required: true,
  },
  Constructor: {
    constructorId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  roundNo: {
    type: String,
    required: true,
  },
  Q1: {
    type: String,
    required: true,
  },
  Q2: {
    type: String,
    required: true,
  },
  Q3: {
    type: String,
    required: true,
  },
});

const QualyfingResulsByYear = new mongoose.Schema({
  QualyfingResult: QualyfingResultItem,
});

module.exports = mongoose.model("F1_QualyfingResults", QualyfingResulsByYear);
