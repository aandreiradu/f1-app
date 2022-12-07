const Teams = require("../../model/Teams");

const addTeam = async (req, res, next) => {
  const { name } = req.body;
  console.log("name", name);

  if (!name) {
    const error = new Error("Invalid request params");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const logoUrl = req.file.path;
    console.log("logoUrl", logoUrl);

    if (!logoUrl) {
      const error = new Error("Invalid request params");
      error.statusCode = 400;
      return next(error);
    }

    const team = new Teams({
      name,
      logoUrl,
    });

    console.log("team created", team);
    await team.save();

    return res.status(200).json({
      message: "Team created successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    return next(error);
  }
};

const getTeams = async (req, res, next) => {
  const teams = await Teams.find();

  if (!teams) {
    const error = new Error("No teams found");
    error.statusCode = 204;
    return next(error);
  }

  return res.status(200).json({
    message: "Teams fetched successfully",
    teams,
  });
};

module.exports = {
  addTeam,
  getTeams,
};
