//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const adminController = require('../controllers/admin.controller');

//Router for get
router.get('/', adminController.index);

//Module export
module.exports = router;