/*** 
File: admin.router.js 
***/

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
router.get('/quan-li-taikhoan', adminController.quanlytaikhoan);


//Router quanlynguonsanpham
router.get('/quan-li-nguonsanpham', adminController.quanlynguonsanpham);


//Router quanlyban
router.get('/quan-li-ban', adminController.quanlyban);


//Router quanlysanpham
router.get('/quan-li-sanpham', adminController.quanlysanpham);


//Router quanlynhanvien
router.get('/quan-li-nhanvien', adminController.quanlynhanvien);


//Router quanlykhachhang
router.get('/quan-li-khachhang', adminController.quanlykhachhang);


//Router quanlyxuathang
router.get('/quan-li-xuathang', adminController.quanlyxuathang);


//Router quanlynhaphang
router.get('/quan-li-nhaphang', adminController.quanlynhaphang);


//Router quanlychitietxuathang
router.get('/quan-li-chitietxuathang', adminController.quanlychitietxuathang);


//Router quanlychitietnhaphang
router.get('/quan-li-chitietnhaphang', adminController.quanlychitietnhaphang);


//Module export
module.exports = router;
