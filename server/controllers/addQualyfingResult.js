const QualyfingResultsByYear = require("../model/QualyfingResult");

const addQualyfingResult = async (req, res) => {
  const { QualyfingResults, year } = req.body;

  console.log("RECEIVED THIS", req.body);

  if (!QualyfingResults || !year || QualyfingResults?.roundNo) {
    return res
      .status(500)
      .json({ statusCode: 500, message: `Invalid request params` });
  }

  try {
    //   check if are already results inserted for this year;
    const getYearDocument = await QualyfingResultsByYear.findOne({
      year,
    }).exec();

    if (!getYearDocument) {
      console.log("!getYearDocument");
      // no results added so far. can create new document
      const insertNewDocument = await QualyfingResultsByYear.create({
        year,
        QualyfingResults: QualyfingResults,
      });
      await insertNewDocument.save();
      return res
        .status(201)
        .json({ message: `New qualying result inserted`, statusCode: 201 });
    } else {
      // results exists => check :
      /*
            a) result for this round is already added => return 400
            b) result for this round is not added => insert
        */

      // start implement point a
      console.log("START CHECK FOR EXISTING RESULT");
      const qualyResultsPerYear = getYearDocument?.QualyfingResults;
      const resultAlreadyRegistered = qualyResultsPerYear?.find(
        (result) => result?.roundNo === QualyfingResults?.roundNo
      );
      console.log("resultAlreadyRegistered result", resultAlreadyRegistered);
      if (resultAlreadyRegistered) {
        return res.status(200).json({
          message: `Result already inserted for year ${year} round ${QualyfingResults?.roundNo}`,
        });
      }
      console.log("STOP CHECK FOR EXISTING RESULT");
      // stop implement point a

      // start implement point b
      console.log("START ADD RACE RESULT");
      const qulayfingResultJSON = getYearDocument.toObject();
      qulayfingResultJSON.QualyfingResults = [
        ...qulayfingResultJSON.QualyfingResults,
        { QualyfingResults },
      ];

      getYearDocument.QualyfingResults = qulayfingResultJSON?.QualyfingResults;
      await getYearDocument.save();
      // stop implement point b
      console.log("START ADD RACE RESULT");
      return res
        .status(201)
        .json({ message: `New qualying result inserted`, statusCode: 201 });
    }
  } catch (error) {
    return res.status(500).json(error?.message || "Internal Server Error");
  }
};

module.exports = addQualyfingResult;
