const express = require('express');
const { userController } = require('../controllers');
const { accessToken } = require("../middleware/auth");


const router = express.Router();

router.get("", accessToken, userController.getNav)
router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);

module.exports = router;
