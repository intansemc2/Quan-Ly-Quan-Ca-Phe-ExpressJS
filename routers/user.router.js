//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const userController = require('../controllers/user.controller');

//Router for get
router.get('/', userController.index);
router.get('/reservation-table', userController.reservationTable);
router.get('/reservation-food', userController.reservationFood);
router.get('/account-manager', userController.accountManager);

//Module export
module.exports = router;