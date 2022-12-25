const User = require("../../model/Users");

const getFavoriteProductsByUID = async (req, res, next) => {
  const { userId } = req;
  console.log("@@getFavoriteProducts userId", userId);

  if (!userId) {
    const error = new Error("No associate user for userId");
    error.statusCode = 401;
    return next(error);
  }

  // get all the favorite products from User schema
  const user = await User.findById(userId).populate([
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

  if (!user) {
    const error = new Error("No data related to this user");
    error.statusCode = 204;
    return next(error);
  }

  const returnObj = user.favoriteProducts?.map((product) => {
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

  console.log("returnObj", returnObj);

  return res.status(200).json({
    message: "Fetched favorite products successfully",
    products: returnObj || [],
  });
};

module.exports = getFavoriteProductsByUID;
