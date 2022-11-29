const express = require("express");
const router = express.Router();

const { accessToken } = require("../middleware/auth")
const { cartController } = require("../controllers");


router.get("", accessToken, cartController.showCart);
router.post("", accessToken, cartController.addCart);
router.patch("/check", accessToken, cartController.checkToProduct);
router.patch("", accessToken, cartController.editCart);
router.delete("", accessToken, cartController.deleteCart);


module.exports = router
