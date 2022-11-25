const router = require("express").Router();
const {
  updateProfilePicture,
} = require("../../controllers/updateProfilePictureController");

// update profile picture
router.post("/updateProfilePicture", updateProfilePicture);

module.exports = router;
