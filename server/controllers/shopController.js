const User = require("../model/Users");
const Product = require("../model/StoreProducts");
const { validationResult } = require("express-validator");
const { removeFile } = require("../utils/files");
const path = require("path");

const createProduct = async (req, res, next) => {
  const { title, description, price, details, teamId } = req.body;
  console.log("req.file", req.file);

  if (!title || !description || !price || !teamId) {
    const error = new Error("Invalid request params on Create Product");
    error.statusCode = 400;

    // remove file in case of error
    const fileToRemove = req?.file?.path || null;
    console.log("fileToRemove", fileToRemove);
    if (fileToRemove) {
      console.log("path to remove", path.join(__dirname, "..", fileToRemove));
      removeFile(path.join(__dirname, "..", fileToRemove));
    }

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

    // remove file in case of error
    const fileToRemove = req?.file?.path || null;
    console.log("fileToRemove", fileToRemove);
    if (fileToRemove) {
      console.log("path to remove", path.join(__dirname, "..", fileToRemove));
      removeFile(path.join(__dirname, "..", fileToRemove));
    }

    return next(error);
  }

  try {
    const imageUrl = req?.file?.path || null;
    console.log("imageUrl", imageUrl);
    if (!imageUrl) {
      const error = new Error(
        "Validation failed. Entered data is not in correct format"
      );
      error.statusCode = 422;
      console.log("errors.array", errors.array());
      error.data = errors.array()[0] || "Didn't received product image";
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
  const currentPage = req.query.page || 1;
  const perPage = process.env.SHOP_PRODUCTS_PER_PAGE || 6;

  console.log({ currentPage, perPage });

  try {
    const productsCount = await Product.countDocuments();

    const products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate({
        path: "creator",
        select: "fullName",
      })
      .exec();

    console.log("@@getProducts result", products);

    if (!products) {
      return res.status(204).json({
        message: "No products found",
      });
    }

    return res.status(200).json({
      message: "Fetched products successfully",
      products,
      totalProducts: productsCount,
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

  const product = await Product.findById(productId).populate({
    path: "teamId",
    select: ["name", "logoUrl", "_id"],
  });
  console.log(`@@@getProductById for productId ${productId} `, product);

  if (!product) {
    const error = new Error("No product found for provided productId");
    error.statusCode = 400;
    return next(error);
  }

  return res.status(200).json({
    message: "Product fetched successfully",
    product: {
      id: product._id,
      title: product?.title,
      price: product?.price,
      description: product?.description,
      details: product?.details,
      imageUrl: product?.imageUrl,
    },
    team: {
      ...product?.teamId.toJSON(), // to avoid _doc
    },
  });
};

const getProductsByTeamId = async (req, res, next) => {
  const { teamId } = req.params;

  console.log("req.team", req.team);

  if (!teamId) {
    const error = new Error("Invalid request params. Missing teamId");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const products = await Product.find({ teamId });

    console.log("products", products);

    // Not throwing error here because i need info about the requested team
    // if (!products || products.length === 0) {
    //   const error = new Error("No products found");
    //   error.statusCode = 204;
    //   return next(error);
    // }

    const { name, logoUrl: teamLogoUrl, teamFullName } = req?.team;
    console.log({
      name,
      teamFullName,
      teamLogoUrl,
    });

    return res.status(200).json({
      message:
        products?.length > 0
          ? "Products fetched successfully"
          : "No products found",
      products,
      team: {
        constructorName: name,
        teamName: teamFullName,
        logoUrl: teamLogoUrl,
      },
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
