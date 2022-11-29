const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProductById,
} = require("../../controllers/shopController");

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
  multer({
    storage: fileStorage,
    fileFilter,
  }).single("productPicture"),
  createProduct
);

// Return product by id
router.get("/shop/product/:productId", getProductById);

module.exports = router;
