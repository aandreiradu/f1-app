require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const connectDB = require("./config/dbConnection");
const verifyJWT = require("./middlewares/verifyJWT");
const bodyParser = require("body-parser");
const multer = require("multer");
const authRoutes = require("./routes/auth/auth");
const userRoutes = require("./routes/user/userRoutes");

connectDB();

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors({ corsOptions, credentials: true, origin: true }));

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

// built-in middleware for json
app.use(express.json());
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/xwww-

// // middleware for cookies
app.use(cookieParser());

// multer init
app.use(
  multer({
    storage: fileStorage,
    fileFilter,
  }).single("profilePicture")
);

app.use("/images", express.static(path.join(__dirname, "images"))); // make images directory accessible
app.use(express.static(path.join(__dirname, "public"))); //make public directory accessible

// routes
app.use("/", require("./routes/root"));

app.use(authRoutes);

// Protected Routes below this middleware
app.use(verifyJWT);

app.use("/api/user", userRoutes);

app.use("/api/addRaceResult", require("./routes/api/addRaceResult"));
app.use(
  "/api/getRaceResultByYear",
  require("./routes/api/getRaceResultByYear")
);
app.use(
  "/api/accounts/updateProfilePicture",
  require("./routes/api/updateUserInfo")
);
app.use("/api/accounts/edit", require("./routes/api/updateUserInformations"));

// BETs
app.use("/api/addRaceBet", require("./routes/api/addRaceBet"));

app.use((error, req, res, next) => {
  console.log("error middleware", error);
  const message = error.message;
  const statusCode = error.statusCode || 500;
  const data = error.data || [];

  return res.status(statusCode).json({
    message,
    data,
  });
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res
      .json({ message: "404 Not Found", statusCode: 404 })
      .sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb");
  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
  });
});
