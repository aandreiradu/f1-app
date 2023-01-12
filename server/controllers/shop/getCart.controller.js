const Users = require("../../model/Users");

const getCart = async (req, res, next) => {
  try {
    const user = await Users.findById(req.userId).populate(
      "cart.items.productId"
    );
    console.log("getCart for userId", req.userId, user);

    const totalCart =
      user?.cart?.items
        .reduce((acc, el) => {
          return acc + el.quantity * el.productId.price;
        }, 0)
        .toFixed(2) ?? 0;

    console.log("totalCart", totalCart);

    return res.status(200).json({
      products: user.cart.items,
      totalCart,
      message: "Cart fetched successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    return next(error);
  }
};

module.exports = getCart;
