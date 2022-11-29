const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  logoUrl: {
    type: String,
    required: true,
  },

  teamFullName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("f1_teams", teamsSchema);
