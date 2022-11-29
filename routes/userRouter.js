const express = require('express');
const router = express.Router();

const { accessToken } = require("../middleware/auth");
const { userController } = require('../controllers');


router.get("", accessToken, userController.getNav)
router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);


module.exports = router;
