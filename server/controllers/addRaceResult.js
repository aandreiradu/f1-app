const RaceResultsByYear = require("../model/RaceResults");

const addNewResult = async (req, res) => {
  const { year, roundNo, results } = req.body;

  try {
    const getYearDocument = await RaceResultsByYear.findOne({year}).exec();
  
    if(!getYearDocument) {
      return res.status(204).json({statusCode : 204});
    }
  
    const resultsSoFar = getYearDocument.results;
    const resultAlreadyRegistered = resultsSoFar.find(result => result.roundNo === roundNo);
  
    if(resultAlreadyRegistered) {
      // this round is already registered
      // to do : admin roles can change the results for a race;
      return res.status(200).json({message : `For year ${year} in the round ${roundNo} there are already registered results. Only admins can change the results of a dispusted race.`, statusCode : 200, podiums : resultAlreadyRegistered.podiums});
    }
  
    // for year X and Round Y, there are no results registered => just push to the results;
    const updatedRaceResultsJSObj = getYearDocument.toObject();
    updatedRaceResultsJSObj.results = [
      ...updatedRaceResultsJSObj.results,
      {
        roundNo,
        podiums : results
      }
    ];

    getYearDocument.results = updatedRaceResultsJSObj.results;
    await getYearDocument.save();
  
    return res.status(201).json({message : 'New result inserted', statsuCode : 201});
  } catch (error) {
    return res.statsu(500).json(error.message);
  }

  
};

module.exports = addNewResult;
