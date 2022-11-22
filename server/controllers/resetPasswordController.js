const Users = require("../model/Users");
const { validationResult } = require("express-validator");
const crypto = require("crypto");

const postReset = async (req, res, next) => {
  const errors = validationResult(req);
  const { email } = req.body;

  console.log("validationResult", errors);

  if (!errors.isEmpty()) {
    // return res
    //   .status(422)
    //   .json({ message: errors.array()[0].msg || "Invalid input field" });

    const error = new Error("Validation field");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  if (!email) {
    console.log("didnt received email on req.body");
    return res.status(400).redirect("/reset");
  }

  //search user by email
  try {
    const user = await Users.findOne({ email });
    console.log("user", user);
    if (!user) {
      const error = new Error("Account not found for provided email");
      error.statusCode = 401;
      return next(error);
    }

    //generate token
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(
          "error when trying to generate token for reset password",
          err
        );
        return res.redirect("/reset");
      }

      const token = buffer.toString("hex");
      console.log("generated token", token);
      const resetTokenExpiration = Date.now() + 3600000; // 1h

      //   save token and expiration date in database;
      user.resetToken = token;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();

      return res.status(200).json({
        message: "Token generated successfully",
        token,
        resetTokenExpiration,
      });
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = {
  postReset,
};
