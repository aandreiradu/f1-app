const CircuitModel = require("../model/Tickets");

const ticketsController = async (req, res) => {
  console.log("received ", req.body);
  const { name, start_date, end_date, available_tickets } = req.body || null;

  if (!name || !start_date || !end_date || !available_tickets) {
    return res
      .status(400)
      .json({ message: "Invalid Request", statusCode: 400 });
  }

  try {
    const circuitExists = await CircuitModel.findOne({ name });
    console.log("circuitExists", circuitExists);
    if (circuitExists) {
      console.log(`There is already an circuit added ${name}`);
      return res.status(400).json({
        message: `There is already an circuit added with name ${name}`,
      });
    }

    const newCircuit = CircuitModel.create({
      name: name,
      start_date,
      end_date,
      available_tickets,
    });

    return res
      .status(201)
      .json({ message: `Circuit ${name} added successfully` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err?.message || err || "Internal server error" });
  }
};

module.exports = ticketsController;
