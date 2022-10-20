const verifySecurityRoles = require("../../middlewares/verifySecurityRoles");
const allowedRoles = require("../../config/securityRolesList");
const router = require("express").Router();
const addRaceBetController = require("../../controllers/addBetController");

router
  .route("/")
  .post(verifySecurityRoles(allowedRoles.User), addRaceBetController);

module.exports = router;
