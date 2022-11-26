const User = require("../model/Users");
const Product = require("../model/StoreProducts");
const { validationResult } = require("express-validator");

const createProduct = async (req, res, next) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    const error = new Error("Invalid request params on Create Product");
    error.statusCode = 400;
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      "Validation failed. Entered data is not in correct format"
    );
    error.statusCode = 422;
    console.log("errors.array", errors.array());
    error.data = errors.array()[0];
    return next(error);
  }

  try {
    const imageUrl = req.file.path;
    console.log("imageUrl", imageUrl);
    if (!imageUrl) {
      const error = new Error(
        "Validation failed. Entered data is not in correct format"
      );
      error.statusCode = 422;
      console.log("errors.array", errors.array());
      error.data = errors.array()[0];
      return next(error);
    }

    const product = new Product({
      title,
      description,
      imageUrl,
      price,
      creator: req.userId,
    });

    await product.save();

    return res.status(200).json({
      message: "Product created successfully",
      product: product,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = {
  createProduct,
};
