const Orders = require("../model/Orders");
const Products = require("../model/StoreProducts");
const Users = require("../model/Users");

const updatePaymentStatus = async (orderId) => {
  const order = await Orders.findById(orderId);
  console.log("@updatePaymentStatus order", order);

  if (order) {
    order.payment_status = "Paid";
    await order.save();

    return true;
  }

  return false;
};

const decreaseProductsQty = async (userId) => {
  const user = await Users.findById(userId).select(
    "cart fullName username email"
  );

  user.cart.items.forEach(async (p) => {
    const { productId, quantity, size } = p;
    const product = await Products.findById(productId);

    if (product) {
      const availabilityIndex = product.sizeAndAvailability.findIndex(
        (it) => it.size.toLowerCase() === size.toLowerCase()
      );
      product.sizeAndAvailability[availabilityIndex].availability -= quantity;
      await product.save();
    }
  });

  return user;
};

const clearCart = async (userId) => {
  const user = await Users.findById(userId);

  if (!user) {
    return false;
  }

  user.cart = {
    items: [],
  };

  await user.save();

  return true;
};

module.exports = {
  updatePaymentStatus,
  decreaseProductsQty,
  clearCart,
};
