const router = require("express").Router();
const { createProduct } = require("../../controllers/shopController");

router.get("/products");

router.post("/shop/createProduct", createProduct);

module.exports = router;
