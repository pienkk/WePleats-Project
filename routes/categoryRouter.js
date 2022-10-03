const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers");


router.get("/best", categoryController.getBestCategory);
router.get("/new", categoryController.getNewProductsList);
router.get("", categoryController.getProductByCategory);


module.exports = router
