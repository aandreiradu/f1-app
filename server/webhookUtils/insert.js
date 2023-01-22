const Users = require("../model/Users");
const Orders = require("../model/Orders");

const createOrder = async (userId, stripeSessionId) => {
  console.log(
    "createOrder for userId",
    userId,
    "with stripeSessionId",
    stripeSessionId
  );

  let user = await Users.findById(userId)
    .populate("cart.items.productId")
    .select("cart email");

  console.log("user", user);

  let productsFromCart;
  if (user) {
    productsFromCart = user?.cart.items.map((i) => {
      const { _id, title, price, imageUrl, teamId } = i.productId?.toJSON();
      return {
        product: {
          productId: _id,
          title,
          price,
          imageUrl,
          teamId,
          size: i.size,
        },
        quantity: i.quantity,
        paymentStatus: "Pending",
      };
    });
  }

  console.log("productsFromCart after transform", productsFromCart);

  const order = new Orders({
    products: productsFromCart,
    user: {
      email: user.email,
      userId: userId,
    },
    payment_status: productsFromCart.paymentStatus,
    stripeSession: stripeSessionId,
  });

  await order.save();

  return order;
};

module.exports = {
  createOrder,
};
