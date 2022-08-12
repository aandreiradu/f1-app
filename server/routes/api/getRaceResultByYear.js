const router = require('express').Router();
const getRaceResultByYear = require('../../controllers/getRaceResultByYear');


router.post('/',getRaceResultByYear);

module.exports = router;