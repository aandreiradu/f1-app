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
const authRoutes = require("./routes/auth/auth");
const userRoutes = require("./routes/user/userRoutes");
const storeRoutes = require("./routes/store/store");
const teamsRoutes = require("./routes/teams/teams");
const { stripeWebhook } = require("./webhooks/stripe_checkout");
const { createCheckoutSession } = require("./controllers/shopController");

connectDB();

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors({ corsOptions, credentials: true, origin: true }));

// built-in middleware for json

app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/xwww-

// // middleware for cookies
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "images"))); // make images directory accessible
app.use(
  "/productImages",
  express.static(path.join(__dirname, "productImages"))
); // make productImages directory accessible in order to get the imageUrl for store products
app.use("/teamsLogos", express.static(path.join(__dirname, "teamsLogos"))); // make teamsLogos directory accessible in order to get the imageUrl for teams logos
app.use(express.static(path.join(__dirname, "public"))); //make public directory accessible

// routes
app.use("/", require("./routes/root"));

// SignIn/SignUp routes
app.use(authRoutes);

// stripe webhook
app.use("/webhook/stripe", stripeWebhook);

// Protected Routes below this middleware
app.use(verifyJWT);

// Store routes
app.use(storeRoutes);

// Teams routes
app.use(teamsRoutes);

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
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else if (req.accepts("html")) {
    res
      .json({ message: "404 Not Found", statusCode: 404 })
      .sendFile(path.join(__dirname, "views", "404.html"));
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
