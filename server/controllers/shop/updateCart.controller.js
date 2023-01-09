const { default: mongoose } = require("mongoose");
const Users = require("../../model/Users.js");

const updateCartController = async (req, res, next) => {
  const { productId, size, operation } = req.body;

  console.log("reqbody issss", { productId, size, operation });

  try {
    const products = await Users.findById(req.userId).populate(
      "cart.items.productId"
    );

    console.log("updateCartController prods", products.cart.items);

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
    console.log("cartProductIndex", cartProductIndex);

    if (cartProductIndex > -1) {
      console.log("item found in cart, look for quantity");

      const cartProduct = products.cart.items[cartProductIndex];
      console.log("cartProduct", cartProduct);

      switch (operation) {
        case "ADD": {
          console.log(
            "operation update to cart - add, look for quantity and increase"
          );
          console.log("old quantity", cartProduct.quantity);
          const newQuantity = cartProduct.quantity + 1;
          cartProduct.quantity = newQuantity;
          console.log("new cart product that will be saved in db", cartProduct);
          products.cart.items[cartProductIndex] = cartProduct;

          await products.save();

          const totalCart =
            products.cart.items
              .reduce((acc, el) => {
                return acc + el.quantity * el.productId.price;
              }, 0)
              .toFixed(2) ?? 0;

          console.log("totalCart", totalCart);

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
          console.log(
            "operation update to cart - remove, look for quantity and decrease or remove from cart if quantity 1"
          );
          if (cartProduct.quantity > 1) {
            console.log("quantity > 1, just decrease");
            console.log("old quantity", cartProduct.quantity);
            const newQuantity = cartProduct.quantity - 1;
            cartProduct.quantity = newQuantity;
            console.log("updated product quantity", cartProduct);

            products.cart.items[cartProductIndex] = cartProduct;

            await products.save();

            const totalCart =
              products.cart.items
                .reduce((acc, el) => {
                  return acc + el.quantity * el.productId.price;
                }, 0)
                .toFixed(2) ?? 0;

            console.log("totalCart", totalCart);

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
            const updatedCartItems = products.cart.items.filter(
              (cp) =>
                cp.productId?._id.toString() !== productId.toString() &&
                cp.size.toLowerCase() !== size.toLowerCase()
            );
            console.log("updatedCartItems", updatedCartItems);

            products.cart.items = updatedCartItems;
            await products.save();

            const totalCart =
              products.cart.items
                .reduce((acc, el) => {
                  return acc + el.quantity * el.productId.price;
                }, 0)
                .toFixed(2) || 0;

            console.log("totalCart", totalCart);

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
