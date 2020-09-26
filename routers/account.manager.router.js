/*** 
File: admin.router.js 
***/

//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const accountManager = require('../controllers/account.manager.controller');

//Router main
router.get('/', accountManager.index);

//Module export
module.exports = router;
