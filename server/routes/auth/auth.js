const express = require("express");
const { validatePassword } = require("../../utils/validators");
const router = express.Router();
const { body } = require("express-validator");
const handleLogin = require("../../controllers/authController");
const handleRegister = require("../../controllers/registerController");
const handleRefreshToken = require("../../controllers/refreshController");
const handleLogout = require("../../controllers/logoutController");
const {
  postReset,
  getNewPassword,
  postNewPassword,
} = require("../../controllers/resetPasswordController");

// POST /login => login controller
router.post("/login", handleLogin);

// POST /register => register controller
router.post("/register", handleRegister);

router.get("/refresh", handleRefreshToken);

router.get("/logout", handleLogout);

router.post("/reset", postReset);

router.get("/reset/:token", getNewPassword);

router.post(
  "/new-password",
  [
    body("password")
      .trim()
      // .isLength({ min: 5 })
      .custom(async (value, { req }) => {
        console.log("value is", value);
        if (value) {
          const resultValidationPassword = validatePassword(value);
          console.log("resultValidationPassword", resultValidationPassword);
          if (!resultValidationPassword) {
            console.log("validation failed => reject promise");
            return Promise.reject(
              "Password must be at least 6 characters long, contain 1 digit and a special character"
            );
          }
          return true;
        }
        console.log("no value received, reject promise");
        return Promise.reject(
          "Password must be at least 6 characters long, contain 1 digit and a special character"
        );
      }),
  ],
  postNewPassword
);

module.exports = router;
