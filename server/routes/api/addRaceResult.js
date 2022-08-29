const router = require('express').Router();
const addRaceResult = require('../../controllers/addRaceResult');
const verifySecurityRoles = require('../../middlewares/verifySecurityRoles');
const allowedRoles = require('../../config/securityRolesList');

router
    .route('/')
    .post(verifySecurityRoles(allowedRoles.Admin,allowedRoles.Host),addRaceResult);

module.exports = router;