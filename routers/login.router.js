//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const loginController = require('../controllers/login.controller');

//Router for get
router.get('/', loginController.index);

//Module export
module.exports = router;