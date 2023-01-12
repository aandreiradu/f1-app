const { default: mongoose } = require("mongoose");
const Users = require("../../model/Users.js");

const updateCartController = async (req, res, next) => {
  const { productId, size, operation } = req.body;

  console.log("reqbody issss", { productId, size, operation });

  try {
    const products = await Users.findById(req.userId).populate(
      "cart.items.productId"
    );

    if (!products || products?.length === 0) {
      const error = new Error("No products found to update in cart");
      error.statusCode = 400;
      return next(error);
    }

    const cartProductIndex = products.cart.items.findIndex(
      (cp) =>
        cp?.productId?._id.toString() === productId.toString() &&
        cp.size.toLowerCase() === size?.toLowerCase()
    );

    if (cartProductIndex > -1) {
      const cartProduct = products.cart.items[cartProductIndex];

      switch (operation) {
        case "ADD": {
          const newQuantity = cartProduct.quantity + 1;
          cartProduct.quantity = newQuantity;
          products.cart.items[cartProductIndex] = cartProduct;

          await products.save();

          const totalCart =
            products.cart.items
              .reduce((acc, el) => {
                return acc + el.quantity * el.productId.price;
              }, 0)
              .toFixed(2) ?? 0;

          return res.status(200).json({
            message: "Cart updated",
            cart: products.cart.items,
            totalCart,
            cartItemsCount:
              products.cart.items?.reduce((acc, el) => acc + el.quantity, 0) ||
              0,
          });
        }

        case "REMOVE": {
          if (cartProduct.quantity > 1) {
            const newQuantity = cartProduct.quantity - 1;
            cartProduct.quantity = newQuantity;

            products.cart.items[cartProductIndex] = cartProduct;

            await products.save();

            const totalCart =
              products.cart.items
                .reduce((acc, el) => {
                  return acc + el.quantity * el.productId.price;
                }, 0)
                .toFixed(2) ?? 0;

            return res.status(200).json({
              message: "Cart updated",
              cart: products.cart.items,
              totalCart,
              cartItemsCount:
                products.cart.items?.reduce(
                  (acc, el) => acc + el.quantity,
                  0
                ) || 0,
            });
          } else {
            console.log("quantity == 1, remove from cart", cartProduct);
            console.log("cart before", products.cart.items);

            const restOfItems = products.cart?.items?.filter(
              (cp) => cp.productId?._id.toString() !== productId.toString()
            );
            console.log("restOfItems", restOfItems);

            const productsWithSameIdDiffSize = products.cart?.items?.filter(
              (cp) =>
                cp.productId._id.toString() === productId.toString() &&
                cp.size.toLowerCase() !== size.toLowerCase()
            );

            const updatedCartItems = [
              ...restOfItems,
              ...productsWithSameIdDiffSize,
            ];

            products.cart.items = updatedCartItems;
            await products.save();

            const totalCart =
              products.cart.items
                .reduce((acc, el) => {
                  return acc + el.quantity * el.productId.price;
                }, 0)
                .toFixed(2) || 0;

            return res.status(200).json({
              message: "Cart updated",
              cart: products.cart.items,
              totalCart,
              cartItemsCount:
                products.cart.items?.reduce(
                  (acc, el) => acc + el.quantity,
                  0
                ) || 0,
            });
          }
        }

        default: {
          console.log(
            `Unhandled operation in UPDATE CART Controller`,
            operation
          );
          const error = new Error("Unhandled operation when updating the cart");
          error.statusCode = 400;
          return next(error);
        }
      }
    } else {
      console.log("item not found in cart");
      const error = new Error("Item not found in cart");
      error.statusCode = 400;
      return next(error);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    return next(error);
  }
};

module.exports = updateCartController;
