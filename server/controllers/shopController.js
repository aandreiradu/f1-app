const User = require("../model/Users");
const Product = require("../model/StoreProducts");
const { validationResult } = require("express-validator");
const { removeFile } = require("../utils/files");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createProduct = async (req, res, next) => {
  const {
    title,
    description,
    price,
    details,
    teamId,
    sizeAvailability,
    itemWithNoSize,
  } = req.body;
  console.log("req.file", req.file);

  console.log("req.body baa", req.body);
  // return res.status(200).json({ message: "test" });

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
      errors.array()[0].msg ||
        "Validation failed. Entered data is not in correct format"
    );
    error.statusCode = 422;
    console.log("errors.array", errors.array());
    error.data = errors.array()[0];

    console.log("error to return", error);

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

    console.log("SA", sizeAvailability);
    if (sizeAvailability) {
      console.log(
        "SA PARSED w/ stringify",
        JSON.stringify(JSON.parse(sizeAvailability))
      );
      console.log("sa is array", Array.isArray(sizeAvailability));
      console.log(
        "sa is array parsed",
        Array.isArray(JSON.parse(sizeAvailability))
      );
    }

    const product = new Product({
      title,
      description,
      details,
      imageUrl,
      price,
      creator: req.userId,
      teamId: teamId,
      sizeAndAvailability: sizeAvailability
        ? [...JSON.parse(sizeAvailability)]
        : [],
      hasSize: itemWithNoSize,
    });
    await product.save();

    console.log("product created", product);

    // const product = {
    //   title,
    //   description,
    //   details,
    //   imageUrl,
    //   price,
    //   creator: req.userId,
    //   teamId: teamId,
    //   sizeAndAvailability: [...JSON.parse(sizeAvailability)],
    // };

    console.log("product created", product);

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
    }
    return next(error);
  }
};

const getProductsByQuery = async (req, res, next) => {
  console.log("req.query", req.query);
  const { query } = req.query;

  try {
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(query);

    console.log("searchRgx", searchRgx);

    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: searchRgx, $options: "i" } },
        { "teamId.teamFullName": { $regex: searchRgx, $options: "i" } },
      ],
    }).populate("teamId");
    // .limit(5);

    console.log("searchedProducts", searchedProducts);

    return res.status(200).json({
      products: searchedProducts,
      message:
        searchedProducts?.length > 0
          ? "Products fetched successfully"
          : "No products found",
      totalProducts: searchedProducts?.length || 0,
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }

  return res.status(200).json({
    message: "Received this query " + query,
  });
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
    select: ["name", "logoUrl", "_id", "teamFullName"],
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
      sizeAndAvailability: product?.sizeAndAvailability || [],
      hasSize: product?.hasSize,
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
    }
    return next(error);
  }
};

const createCheckoutSession = async (req, res, next) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    const error = new Error(
      "No products found in cart in order to create a session"
    );
    error.statusCode = 401;
    return next(error);
  }

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: products.map((p) => {
      return {
        name: p.productId.title,
        description: p.productId.description,
        amount: p.productId.price * 100,
        currency: "EUR",
        quantity: p.quantity,
      };
    }),
    success_url: req.protocol + "://" + req.get("host") + "/checkout/success",
    cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
  });

  // console.log("stripeSession", stripeSession);

  return res.status(200).json({
    message: "OK",
    stripeSession,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByTeamId,
  getProductsByQuery,
  createCheckoutSession,
};
