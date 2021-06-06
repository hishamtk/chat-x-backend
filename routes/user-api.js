const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const registrationValidator = require('../validators/user-registration-validator')

router.post('/registers',  registrationValidator, AuthController.register);

module.exports = router;