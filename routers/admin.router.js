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
router.get('/quan-ly-taikhoan', adminController.quanlytaikhoan);


//Router quanlynguonsanpham
router.get('/quan-ly-nguonsanpham', adminController.quanlynguonsanpham);


//Router quanlyban
router.get('/quan-ly-ban', adminController.quanlyban);


//Router quanlysanpham
router.get('/quan-ly-sanpham', adminController.quanlysanpham);


//Router quanlynhanvien
router.get('/quan-ly-nhanvien', adminController.quanlynhanvien);


//Router quanlykhachhang
router.get('/quan-ly-khachhang', adminController.quanlykhachhang);


//Router quanlyxuathang
router.get('/quan-ly-xuathang', adminController.quanlyxuathang);


//Router quanlynhaphang
router.get('/quan-ly-nhaphang', adminController.quanlynhaphang);


//Router quanlychitietxuathang
router.get('/quan-ly-chitietxuathang', adminController.quanlychitietxuathang);


//Router quanlychitietnhaphang
router.get('/quan-ly-chitietnhaphang', adminController.quanlychitietnhaphang);


//Module export
module.exports = router;
