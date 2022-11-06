const BetRace = require("../model/BetRace");
const Users = require("../model/Users");
const RaceResults = require("../model/RaceResults");

const addRaceBet = async (req, res) => {
  console.log("received", req.body, req.cookies);
  const { year, roundNo, raceName, podium } = req.body;
  const { jwt: refreshToken } = req.cookies;

  if (!year || !roundNo || !raceName || !podium || !refreshToken) {
    return res.status(400).json({
      message: "Invalid request params",
      statusCode: 400,
    });
  }

  try {
    const searchUser = await Users.findOne({ refreshToken });

    if (!searchUser) {
      console.log("User not found for refresh token", refreshToken);
      return res.status(401).json({
        message: "User not found",
        statusCode: 401,
      });
    }

    // searchUser.raceBets = [];
    // await searchUser.save();
    // return res.status(200).send("Deleted");

    // Check if the race is not finsihed
    const racesFinished = await RaceResults?.findOne({ year: year });
    if (!racesFinished) {
      console.log("cannot bet on races from another season");
      return res.status(401).json({
        message: "You cannot bet on races from another season",
        statusCode: 401,
      });
    }

    // Found Races for this year => check if the race is already finished
    const getRaceByRoundNo = racesFinished?.results?.find(
      (race) => race?.roundNo === roundNo
    );
    console.log("getRaceByRoundNo", getRaceByRoundNo);
    if (getRaceByRoundNo) {
      console.log("found finished races");
      return res.status(401).json({
        message: "You cannot bet on finished races",
        statusCode: 401,
      });
    }

    // Check for existing bet for this race
    const existingBets = searchUser?.raceBets;
    console.log("existingBets for user", searchUser.username, existingBets);
    const findBetByRoundNoAndYear = existingBets?.find(
      (bet) => bet?.year === year && bet?.roundNo === roundNo
    );
    console.log("findBetByRoundNoAndYear", findBetByRoundNoAndYear);
    if (findBetByRoundNoAndYear) {
      console.log("found existing bet");
      const predictedPodium = findBetByRoundNoAndYear?.podium.map(
        (podium, index) => {
          return {
            key: podium.key,
            name: podium.name,
            position: index + 1,
          };
        }
      );
      return res.status(400).send({
        message: `There is already an existing bet for year ${year} round number ${roundNo}, GP ${
          findBetByRoundNoAndYear?.raceName
        }.You placed this bet on ${new Date(
          findBetByRoundNoAndYear?.createdAt
        ).toLocaleString()}`,
        statusCode: 400,
        existingBet: true,
        predictedPodium: JSON.stringify(predictedPodium),
      });
    }

    // No bet found for params : year,roundno => insert bet
    searchUser.raceBets = [
      ...searchUser?.raceBets,
      {
        year,
        roundNo,
        raceName,
        podium,
      },
    ];

    await searchUser.save();
    console.log("bet added");
    return res
      .status(201)
      .json({ message: `New bet inserted successfully`, statusCode: 201 });
  } catch (error) {
    console.log("error addRaceBet controller", error);
    return res.status(500).json(error?.message || "Internal Server Error");
  }
};

module.exports = addRaceBet;
