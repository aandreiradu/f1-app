const { default: mongoose } = require("mongoose");
const Products = require("../../model/StoreProducts");

const isValidProductSA = async (req, res, next) => {
  const { productId, size } = req.body;

  if (!productId || !size) {
    const error = new Error("Invalid request params");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const product = await Products.findById(mongoose.Types.ObjectId(productId));
    console.log("@@isValidProductSA middleware product", product);

    if (!product) {
      const error = new Error("Invalid product");
      error.statusCode = 422;
      return next(error);
    }

    const sizeAndAvailability = product?.sizeAndAvailability.find(
      (item) => item.size === req.body.size
    );
    console.log(
      "@@@sizeAvailabile for userId",
      req.userId,
      "with productId",
      productId,
      sizeAndAvailability
    );

    if (!sizeAndAvailability) {
      console.log(
        "Couldnt find the product in database for productId",
        productId,
        "with size",
        req.body.size
      );
      const error = new Error(
        `Couldn't find the product by the requested size ${req.body.size} or the product is not availabile in this size`
      );
      error.statusCode = 422;
      return next(error);
    }

    const { size, availability } = sizeAndAvailability;
    if (availability <= 0) {
      console.log("Out of Stock for productId", productId);
      const error = new Error(
        `For product ${product?.title} with size ${size} there are no more available sizes`
      );
      error.statusCode = 422;
      return next(error);
    }

    console.log(
      "Userid",
      req.userId,
      "passed validation when adding to cart the product with ID",
      productId
    );
    req.productId = product?._id.toString();
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = isValidProductSA;
