const router = require("express").Router();
const addQualyfingResult = require("../../controllers/addQualyfingResult");
const verifySecurityRoles = require("../../middlewares/verifySecurityRoles");
const allowedRoles = require("../../config/securityRolesList");

router
  .route("/")
  .post(
    verifySecurityRoles(allowedRoles.Admin, allowedRoles.Host),
    addQualyfingResult
  );

module.exports = router;
