const express = require('express');

const userController = require('../controller/userController');
const {userValidation} = require('../validations/userValidation');
const {loginValidation} = require('../validations/loginValidation');

const authValidation = require('../auth/auth'); 

const router = express.Router();

router.route('/current-user').post(authValidation,userController.getCurrentUser)

router.route('/register').post(userValidation,userController.registerUser)

router.route('/login').post(loginValidation,userController.loginUser)

module.exports = router;