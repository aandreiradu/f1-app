const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  sendConfirmationEmail,
} = require("../webhookUtils/sendConfirmationEmail");
const { createOrder } = require("../webhookUtils/insert");
const {
  updatePaymentStatus,
  decreaseProductsQty,
} = require("../webhookUtils/update");

const stripeWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("CASE checkout.session.completed session", session);

      const order = await createOrder(
        session?.metadata["f1_userId"],
        session?.id
      ); // mark this as pending payment
      console.info("order", order);

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        // update the order created above from pending payment to paid ?
        if (order) {
          // decrease the quantity of the items when status is paid
          const userData = await decreaseProductsQty(
            session?.metadata["f1_userId"]
          );

          // update payment status from pending to paid
          await updatePaymentStatus(order._id);

          // send confirmation email to the customer
          await sendConfirmationEmail(userData, {
            subtotal: session.amount_subtotal / 100,
            total: session.amount_total / 100,
            shipping: session.shipping_options[0].shipping_amount / 100,
          });
        }
      }

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      // console.log("CASE checkout.session.async_payment_failed", session);
      // Send an email to the customer asking them to retry their order
      //   emailCustomerAboutFailedPayment(session);

      break;
    }
  }

  // Return a 200 res to acknowledge receipt of the event
  res.status(200).end();
};

module.exports = { stripeWebhook };
