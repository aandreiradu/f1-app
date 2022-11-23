const Users = require("../model/Users");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

// init transporter
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

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

      const responseTransporter = await transporter.sendMail({
        to: email,
        from: "raduandrei697@gmail.com",
        subject: "F1 App @ Reset Password",
        html: `
              <p>You requested a password request</p>
              <p>Click this link in order to set a new password(available for 1h). <a href="http://localhost:3000/reset/${token}">link</a></p>
        `,
      });

      console.log("responseTransporter", responseTransporter);

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

const getNewPassword = async (req, res, next) => {
  console.log("landed on getNewPassword");
  const { token } = req.params;

  console.log("token received", token);

  if (!token) {
    const error = new Error(
      "Invalid request params. Missing token from request params"
    );
    error.statusCode = 400;
    return next(error);
  }

  // search user based on received token
  try {
    const userByToken = await Users.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!userByToken) {
      console.log(
        "didnt find user based on provided token or token is expired",
        token
      );
      const error = new Error(
        "No account found based on generated token or token is expired"
      );
      error.statusCode = 401;
      return next(error);
      // return res.redirect("/login");
    }

    console.log("all good here");
    return res.status(200).json({
      message: "ok",
      userId: userByToken._id.toString(),
      token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

const postNewPassword = async (req, res, next) => {
  console.log("landed on postNewPassword");
  console.log("received this", req.body);
  const errors = validationResult(req);
  const { userId, password, token } = req.body;

  if (!errors.isEmpty()) {
    console.log("errors is not empty", errors);
    const error = new Error("Invalid Field");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  if (!userId || !password || !token) {
    console.log("invalid request params");
    const error = new Error("Invalid Request Params");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // find user by userId,token
    const findUser = await Users.findOne({
      _id: mongoose.Types.ObjectId(userId),
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!findUser) {
      console.log(
        "couldnt found user for provided params, redirect back to reset"
      );
      // const error = new Error('No Account Found');
      return res.redirect("/reset");
    }

    console.log("before hash", password);
    const newHassedPassword = await bcrypt.hash(password, 12);
    console.log("after has", newHassedPassword);

    findUser.resetToken = undefined;
    findUser.resetTokenExpiration = null;
    findUser.password = newHassedPassword;

    await findUser.save();

    console.log("ok updated");
    return res
      .status(200)
      .json({
        message: "Password updated",
      })
      .redirect("/login");
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = {
  postReset,
  getNewPassword,
  postNewPassword,
};
