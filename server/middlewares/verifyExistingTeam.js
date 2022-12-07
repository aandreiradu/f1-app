const Teams = require("../model/Teams");
const path = require("path");
const { removeFile } = require("../utils/files");

const verifyExistingTeamById = async (req, res, next) => {
  console.log("start middleware to check existing team");
  console.log("req.body middleware", req.body);
  const { teamId } = req.body;
  console.log("req.file.path", req?.file?.path);
  if (req?.file?.path) {
    console.log("path to remove", path.join(__dirname, "..", req?.file?.path));
  }
  if (!teamId) {
    const error = new Error("Invalid request params. TeamId not found");
    error.statusCode = 400;
    if (req?.file?.path) {
      removeFile(path.join(__dirname, "..", req?.file?.path));
    }
    return next(error);
  }

  const isExistingTeam = await Teams.findById(teamId);
  console.log("isExistingTeam", isExistingTeam);

  if (!isExistingTeam) {
    const error = new Error("No team found for provided teamId");
    error.statusCode = 400;
    if (req?.file?.path) {
      removeFile(path.join(__dirname, "..", req?.file?.path));
    }
    return next(error);
  }

  console.log("end middleware to check existing team");
  next();
};

module.exports = verifyExistingTeamById;
