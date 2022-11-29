const User = require("../model/Users");
const Product = require("../model/StoreProducts");
const { validationResult } = require("express-validator");

const createProduct = async (req, res, next) => {
  const { title, description, price, details, teamId } = req.body;
  console.log("req.file", req.file);

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
      details,
      imageUrl,
      price,
      creator: req.userId,
      teamId: teamId,
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

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate({
      path: "creator",
      select: "fullName",
    });

    console.log("@@getProducts result", products);

    if (!products) {
      return res.status(204).json({
        message: "No products found",
      });
    }

    return res.status(200).json({
      message: "Fetched products successfully",
      products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statuCode = 500;
      return next(error);
    }
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) {
    const error = new Error("Invalid request params. Missing productId");
    error.statusCode = 400;
    next(error);
  }

  const product = await Product.findById(productId);
  console.log(`@@@getProductById for productId ${productId} `, product);

  if (!product) {
    console.log("a intrat aici??");
    const error = new Error("No product found for provided productId");
    error.statusCode = 400;
    return next(error);
  }

  console.log("a ajuns aici");
  return res.status(200).json({
    message: "Product found",
    product: {
      id: product._id,
      title: product?.title,
      price: product?.price,
      description: product?.description,
      details: product?.details,
      imageUrl: product?.imageUrl,
    },
  });
};

const getProductsByTeamId = async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) {
    const error = new Error("Invalid request params. Missing productId");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const products = await Product.find({ teamId }).populate("teamId");

    console.log("products", products);

    if (!products) {
      const error = new Error("No products found");
      error.statusCode = 204;
      return next(error);
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByTeamId,
};
