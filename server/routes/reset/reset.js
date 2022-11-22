const router = require("express").Router();
const { postReset } = require("../../controllers/resetPasswordController");
const { body } = require("express-validator");

router.post(
  "/",
  [body("email", "Invalid email format").trim().isEmail()],
  postReset
);

module.exports = router;
