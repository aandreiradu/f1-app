const Products = require("../../model/StoreProducts");

const isValidProduct = async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    const error = new Error("Invalid request params");
    error.statusCode = 403;
    return next(error);
  }

  try {
    const product = await Products.findById(productId);

    if (!product) {
      console.log(
        "@@@isValidProduct no product found for productId",
        productId
      );
      const error = new Error("Invalid product");
      error.statusCode = 403;
      return next(error);
    }

    req.productId = product?._id.toString();
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = isValidProduct;
