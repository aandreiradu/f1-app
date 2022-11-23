const router = require("express").Router();
const {
  postReset,
  getNewPassword,
  postNewPassword,
} = require("../../controllers/resetPasswordController");
const { body } = require("express-validator");

router.post(
  "/",
  [body("email", "Invalid email format").trim().isEmail()],
  postReset
);

router.get("/:token", getNewPassword);

router.post(
  "/",
  [body("password").trim().isLength({ min: 5 })],
  postNewPassword
);

module.exports = router;
