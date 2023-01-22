const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const sendConfirmationEmail = async (userData, orderData) => {
  console.log("userData", userData);
  console.log("orderData", orderData);
  const { fullName, username, email } = userData;
  const { subtotal, total, shipping } = orderData;

  if (!email) {
    console.log("No email provided");
    return;
  }

  // init transporter
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  await transporter.sendMail({
    to: email,
    from: "raduandrei697@gmail.com",
    subject: `F1 Store @ Order Confirmation`,
    html: `
                <p><b>Hello, ${fullName || username}</b></p>
                <p>Here are your order details :</p>
                <ul>
                  <li>Subtotal : ${subtotal} €</li>
                  <li>Shipping : ${shipping} €</li>
                  <li>Total : ${total} €</li>
                </ul>
          `,
  });
};

module.exports = { sendConfirmationEmail };
