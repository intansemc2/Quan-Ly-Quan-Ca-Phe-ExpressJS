//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const adminController = require('../controllers/admin.controller');

//Router main
router.get('/', adminController.tongquat);

//Router tongquat
router.get('/tong-quat', adminController.tongquat);

//Router quanlytaikhoan
router.post('/getTaikhoanTypes', adminController.getTaikhoanTypes);

router.get('/quan-ly-tai-khoan', adminController.quanlytaikhoan);

//Module export
module.exports = router;