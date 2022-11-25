const router = require("express").Router();
const {
  updateProfilePicture,
  upload,
} = require("../../controllers/updateProfilePictureController");
const uploadeProfilePictureMiddleware = require("../../middlewares/updateProfilePicture");

router.route("/");
// .post(upload.single('profilePicture'),updateProfilePicture);
// .post(uploadeProfilePictureMiddleware,updateProfilePicture);

module.exports = router;
