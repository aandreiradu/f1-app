const { default: mongoose } = require("mongoose");
const Users = require("../../model/Users");

const addProductToFavorites = async (req, res, next) => {
  console.log("a intrat aici");
  const { productId, userId } = req;

  if (!productId) {
    const error = new Error("No productId provided");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const user = await Users.findById(userId);
    // console.log("user", user);
    if (!user) {
      const error = new Error("No user found");
      error.statusCode = 401;
      return next(error);
    }

    console.log("mongoose.Types.ObjectId(productId)", productId.toString());

    const productIdsStrings = user.favoriteProducts?.map((p) =>
      p?.productId.toString()
    );

    console.log("@@@productIdsStrings", productIdsStrings);
    console.log("@@@productId", productId);

    const isExistingFav = user.favoriteProducts?.find(
      (p) => p?.productId.toString() === productId.toString()
    );
    console.log("isExistingFav", isExistingFav);
    if (isExistingFav) {
      console.log("existing product, remove it");
      // Product is already in fav => remove it;
      const updatedFavProduct = user.favoriteProducts?.filter(
        (p) => p?.productId.toString() !== productId.toString()
      );
      console.log("updatedFavProduct", updatedFavProduct);
      user.favoriteProducts = updatedFavProduct;
      await user.save();

      res.status(200).json({
        message: "Removed",
        favoriteProducts: updatedFavProduct || [],
      });
    } else {
      console.log("not existing product, add it");
      // Product is not in fav => add it
      const updatedProducts = [
        ...user.favoriteProducts,
        { productId: mongoose.Types.ObjectId(productId) },
      ];
      user.favoriteProducts = updatedProducts;
      await user.save();

      res.status(200).json({
        message: "Added",
        favoriteProducts: updatedProducts,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = addProductToFavorites;
