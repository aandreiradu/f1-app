const router = require('express').Router();
const addRaceResult = require('../../controllers/addRaceResult');

router.post('/',addRaceResult);

module.exports = router;