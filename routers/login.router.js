//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const loginController = require('../controllers/login.controller');

//Router for get
router.get('/', loginController.login);
router.get('/login', loginController.login);
router.get('/forgot-password', loginController.forgotPassword);
router.get('/logout', loginController.logout);

//Module export
module.exports = router;