const router = require("express").Router();
const ticketsController = require("../../controllers/ticketsController");
const { route } = require("./addRaceResult");

router.route("/").post(ticketsController);

module.exports = router;
