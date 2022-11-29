const express = require("express");
const router = express.Router();
const { accessToken } = require("../middleware/auth")

const { orderController } = require("../controllers")

router.get("", accessToken, orderController.getOrder);
router.get("/list", accessToken, orderController.getOrderList)
router.post("/product", accessToken, orderController.createProductToOrder)
router.post("", accessToken, orderController.createOrder);

module.exports = router
