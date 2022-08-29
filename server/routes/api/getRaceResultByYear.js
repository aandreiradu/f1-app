const router = require('express').Router();
const getRaceResultByYear = require('../../controllers/getRaceResultByYear');
const allowedRoles = require('../../config/securityRolesList');
const verifySecurityRoloes = require('../../middlewares/verifySecurityRoles');

router
    .route('/')
    .post(getRaceResultByYear);



module.exports = router;