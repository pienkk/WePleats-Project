const express = require("express");
const router = express.Router();

const { productController } = require("../controllers");


router.get("/:productId", productController.getProduct);


module.exports = router