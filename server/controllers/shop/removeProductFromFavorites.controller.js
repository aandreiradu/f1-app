const Users = require("../../model/Users");

const removeProductFromFavorites = async (req, res, next) => {
  const { productId, userId } = req;
  console.log({ productId, userId });

  if (!productId) {
    const error = new Error("No productId provided");
    error.statusCode = 401;
    return next(error);
  }

  try {
    // get all the favorite products from User schema
    const user = await Users.findById(userId).populate([
      {
        path: "favoriteProducts",
        populate: {
          path: "productId",
        },
      },
      {
        path: "favoriteProducts.productId",
        populate: {
          path: "teamId",
        },
      },
    ]);
    console.log("found this user", user);
    console.log("favss", user.favoriteProducts);

    if (!user) {
      const error = new Error("No user found");
      error.statusCode = 401;
      return next(error);
    }

    console.log("productId.toString()", productId.toString());
    const filteredFavItems = user.favoriteProducts.filter(
      (item) => item.productId._id.toString() !== productId.toString()
    );

    const returnObj = filteredFavItems.map((product) => {
      const { _id, title, description, details, price, imageUrl } =
        product.productId;
      const {
        _id: idTeam,
        name: teamName,
        teamFullName,
        logoUrl: teamLogo,
      } = product.productId.teamId;

      return {
        product: {
          _id,
          title,
          description,
          details,
          price,
          imageUrl,
        },
        team: {
          idTeam,
          teamName,
          teamFullName,
          teamLogo,
        },
      };
    });
    console.log("filteredFavItems", filteredFavItems);
    console.log("returnObj", returnObj);

    user.favoriteProducts = filteredFavItems;
    await user.save();

    return res.status(200).json({
      message: "Product removed from favorites",
      favoriteProducts: returnObj,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = removeProductFromFavorites;
