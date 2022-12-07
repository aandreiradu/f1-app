const router = require("express").Router();
const {
  addTeam,
  getTeams,
} = require("../../controllers/teams/teamsController");
const multer = require("multer");
const path = require("path");
const Teams = require("../../model/Teams");

// Configure multer
const fileStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Check if an item with the same name is already inserted in the database;
    const { name } = req.body;
    console.log("name middleware multer", name);

    const existingTeam = await Teams.findOne({ name });
    console.log("existingTeam multer middleware", existingTeam);

    if (existingTeam) {
      const error = new Error("An item with the same name is already inserted");
      error.statusCode = 400;
      return cb(error, null);
    }

    cb(null, "teamsLogos");
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
  const acceptableExtensions = ["png", "jpg", "jpeg", "jpg", "svg"];
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

// Add Team
router.post(
  "/addTeam",
  multer({
    storage: fileStorage,
    fileFilter,
  }).single("teamLogo"),
  addTeam
);

router.get("/teams", getTeams);

module.exports = router;
