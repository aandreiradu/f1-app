const express = require("express");
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
  [body("password").trim().isLength({ min: 5 })],
  postNewPassword
);

module.exports = router;
