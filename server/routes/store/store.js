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
const itsAuthorized = require("../../middlewares/shop/itsAuthorized.middleware");

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
  const acceptableExtensions = ["png", "jpg", "jpeg", "jpg", "webp"];
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
    itsAuthorized,
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
    body("sizeAvailability").custom((value) => {
      console.log("sizeAvailability validator", value);
      try {
        console.log("is array?", Array.isArray(JSON.parse(value)));
        const checkSA = JSON.parse(value);
        console.log("checkSA", checkSA);
        console.log("checkSA array", Array.isArray(checkSA));
        checkSA.forEach((item, idx) => {
          console.log("item is", item);
          const { index, size, availability } = item;
          console.log("for idx", idx, "we receieved this", item);
          console.log({ index, size, availability });

          if (!size || !availability) {
            console.log({ size, avilability });
            throw new Error("Invalid parameter SIZEAVAILABILITY");
          }
          const sizes = ["S", "M", "L", "XL", "XXL"];
          if (!sizes.includes(size)) {
            throw new Error("Invalid parameter size");
          }

          if (availability < 0 || availability > 1000) {
            throw new Error("Availability out of range");
          }
        });

        console.log("Availabilit passed validations");
        return true;
      } catch (error) {
        console.log("catch middleware SAI", error);
        return Promise.reject(error || "Unexpected error occured");
      }
    }),
  ],
  createProduct
);

// Return product by id
router.get("/shop/product/:productId", getProductById);

// Return all the products by teamId
router.get("/shop/team/:teamId", populateTeamInfo, getProductsByTeamId);

module.exports = router;
