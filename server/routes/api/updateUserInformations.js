const router = require('express').Router();
const getUserInfo = require('../../controllers/getUserInformationsController');
const updateUserInfo = require('../../controllers/updateUserInfoController');
const verifySecurityRoles = require('../../middlewares/verifySecurityRoles');
const allowedRoles = require('../../config/securityRolesList');


router
    .route('/')
    .get(verifySecurityRoles(allowedRoles.User,allowedRoles.Admin,allowedRoles.Host),getUserInfo)
    .post(updateUserInfo);


module.exports = router;