const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret =
  "whsec_7582a941646a958e5ec01782c6bc1379e6b2a7e04d5812deb5496938fa76bb79";

const stripeWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("CASE checkout.session.completed session", session);
      // Save an order in your database, marked as 'awaiting payment'
      //   createOrder(session);

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        console.log(
          "CASE checkout.session.completed IS PAID HERE",
          session,
          "can fullfill order"
        );
        // fulfillOrder(session);
      }

      break;
    }

    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      console.log("CASE checkout.session.async_payment_succeeded", session);

      // Fulfill the purchase...
      //   fulfillOrder(session);

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;
      console.log("CASE checkout.session.async_payment_failed", session);

      // Send an email to the customer asking them to retry their order
      //   emailCustomerAboutFailedPayment(session);

      break;
    }
  }

  // Return a 200 res to acknowledge receipt of the event
  res.status(200).end();
};

module.exports = { stripeWebhook };
