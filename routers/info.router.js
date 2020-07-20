//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const infoController = require('../controllers/info.controller');

//Router for get
router.get('/', infoController.index);

//Module export
module.exports = router;