const RaceResults = require('../model/RaceResults');


const getRaceResultByYear = async (req,res) => {
    const {year} = req.body;

    if(!year) {
        console.log('no year provided as payload');
        return res.status(400).json({message : 'Invalid request. Provide parameter year in the request', statusCode : 400});
    }

    const searchResultsByYear = await RaceResults.findOne({year}).sort('results.roundNo').exec();

    if(!searchResultsByYear) {
        return res.status(404).json({message : `There are no results for year ${year}`,statusCode :404});
    }

    return res.json(searchResultsByYear.results.sort((a,b) => +a.roundNo > +b.roundNo ? 1 : -1));
}


module.exports = getRaceResultByYear;