const Products = require("../../model/StoreProducts");

const isValidProduct = async (req, res, next) => {
  console.log("a intrat aici");
  const { productId } = req.body;
  try {
    const product = await Products.findById(productId);
    console.log("product", product);

    if (!product) {
      const error = new Error("Invalid product");
      error.statusCode = 401;
      return next(error);
    }

    req.productId = product?._id.toString();
    next();
    console.log("a iesit de aici si am pus pe req asta", req.productId);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = isValidProduct;
