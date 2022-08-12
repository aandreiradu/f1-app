const { handleRefreshToken } = require("../../controllers/refreshController");
const router = require("express").Router();

router.get("/", handleRefreshToken);

module.exports = router;
