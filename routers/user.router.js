//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const userController = require('../controllers/user.controller');

//Router for get
router.get('/', userController.index);

//Module export
module.exports = router;