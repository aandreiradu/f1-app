const Teams = require("../model/Teams");

const populateTeamInfo = async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) {
    const error = new Error("Invalid request params. Missing teamId");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const team = await Teams.findById(teamId);
    console.log("@@@team populateTeamInfo middleware", team);

    if (!team || team?.length === 0) {
      const error = new Error("No team found");
      error.statusCode = 204;
      return next(error);
    }

    if (team) {
      console.log("@@@in if team", team);
      const { teamFullName, name, logoUrl } = team;
      console.log({
        teamFullName,
        name,
        logoUrl,
      });

      req.team = team;
      next();
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      return next(error);
    }
  }
};

module.exports = populateTeamInfo;
