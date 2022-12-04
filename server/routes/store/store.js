const Teams = require("../../model/Teams");
const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByTeamId,
} = require("../../controllers/shopController");
const verifyExistingTeamById = require("../../middlewares/verifyExistingTeam");
const populateTeamInfo = require("../../middlewares/populateTeamInfoById");
const { body } = require("express-validator");

// Configure multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productImages");
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

// Return all products
router.get("/shop/products", getProducts);

// Create product
router.post(
  "/shop/createProduct",
  [
    multer({
      storage: fileStorage,
      fileFilter,
    }).single("productPicture"),
    verifyExistingTeamById,
    body("title").trim().isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
    body("price").custom((value) => {
      if (value < 0) {
        console.log("@@@VALIDATOR createProduct price is negative", value);
        return Promise.reject("Price parameter should be a positive number");
      }

      return true;
    }),
    body("teamId").custom(async (teamId) => {
      console.log("teamId received for validation", teamId);

      const isExistingTeam = await Teams.findById(teamId);
      console.log("isExistingTeam", isExistingTeam);

      if (
        !isExistingTeam ||
        (Array.isArray(isExistingTeam) && isExistingTeam?.length === 0)
      ) {
        return Promise.reject("No teamId asociated with provided teamId");
      }

      return true;
    }),
  ],
  createProduct
);

// Return product by id
router.get("/shop/product/:productId", getProductById);

// Return all the products by teamId
router.get("/shop/team/:teamId", populateTeamInfo, getProductsByTeamId);

module.exports = router;
