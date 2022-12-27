const { default: mongoose } = require("mongoose");
const Users = require("../../model/Users");

const addToCartController = async (req, res, next) => {
  const user = await Users.findById(req.userId).select("cart");

  console.log("user", user);

  try {
    const cartProductIndex = user?.cart?.items.findIndex(
      (item) =>
        item?.productId?.toString() === req.productId &&
        item.size === req.body.size
    );
    console.log("cartProductIndex", cartProductIndex);

    const updatedCartItems = [...user?.cart?.items]; //
    let newQuantity = 1;

    if (cartProductIndex >= 0) {
      console.log("este in cart");
      // this item is already on cart, just increase the quantity;
      newQuantity = +updatedCartItems[cartProductIndex].quantity + 1;
      console.log(
        "new quantity for existing product",
        req.productId,
        "is",
        newQuantity
      );

      // Update the quantity
      updatedCartItems[cartProductIndex].quantity = newQuantity;
      console.log("updated cart items here", updatedCartItems);
    } else {
      // this item is not on cart, just push it
      console.log("nu este in cart");
      updatedCartItems.push({
        productId: mongoose.Types.ObjectId(req.productId),
        quantity: newQuantity, // 1
        size: req.body.size,
      });
      console.log("updated cart items here", updatedCartItems);
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    console.log("updatedCart", updatedCart);
    user.cart = updatedCart;
    await user.save();

    return res.status(200).json({
      message: "product added to cart",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = addToCartController;
