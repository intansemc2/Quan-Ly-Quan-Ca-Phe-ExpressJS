//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const adminController = require('../controllers/admin.controller');

//Router for get
router.get('/', adminController.tongquat);
router.get('/tong-quat', adminController.tongquat);
router.get('/quan-ly-tai-khoan', adminController.quanlytaikhoan);

//Module export
module.exports = router;