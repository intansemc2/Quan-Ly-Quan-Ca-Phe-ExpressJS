//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const errorController = require('../controllers/error.controller');

//Router for get
router.use(errorController.handle404);
router.use(errorController.handle500);

//Module export
module.exports = router;