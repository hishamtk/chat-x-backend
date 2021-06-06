const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const registrationValidator = require('../validators/user-registration-validator')
const loginValidator = require('../validators/user-login-validator');

router.post('/registers',  registrationValidator, AuthController.register);
router.post('/sessions',  loginValidator, AuthController.login);

module.exports = router;