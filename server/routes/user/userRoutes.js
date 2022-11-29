const router = require("express").Router();
const {
  updateProfilePicture,
} = require("../../controllers/updateProfilePictureController");
const multer = require("multer");
const path = require("path");

// Configure multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        new Date().toISOString() +
        path.extname(file.originalname)
      // new Date().toISOString() + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, callback) => {
  const acceptableExtensions = ["png", "jpg", "jpeg", "jpg"];
  if (
    !acceptableExtensions.some(
      (extension) =>
        path.extname(file.originalname).toLowerCase() === `.${extension}`
    )
  ) {
    return callback(
      new Error(
        `Extension not allowed, accepted extensions are ${acceptableExtensions.join(
          ","
        )}`
      )
    );
  }
  callback(null, true);
};

// update profile picture
router.post(
  "/updateProfilePicture",
  multer({
    storage: fileStorage,
    fileFilter,
  }).single("profilePicture"),
  updateProfilePicture
);

module.exports = router;
