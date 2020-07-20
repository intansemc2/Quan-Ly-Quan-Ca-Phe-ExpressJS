//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const staffController = require('../controllers/staff.controller');

//Router for get
router.get('/', staffController.index);

//Module export
module.exports = router;