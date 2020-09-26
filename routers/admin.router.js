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


//Router quanlytaiKhoan
router.get('/quan-li-taiKhoan', adminController.quanlytaiKhoan);


//Router quanlynguonSanPham
router.get('/quan-li-nguonSanPham', adminController.quanlynguonSanPham);


//Router quanlyban
router.get('/quan-li-ban', adminController.quanlyban);


//Router quanlysanPham
router.get('/quan-li-sanPham', adminController.quanlysanPham);


//Router quanlynhanVien
router.get('/quan-li-nhanVien', adminController.quanlynhanVien);


//Router quanlykhachHang
router.get('/quan-li-khachHang', adminController.quanlykhachHang);


//Router quanlyxuatHang
router.get('/quan-li-xuatHang', adminController.quanlyxuatHang);


//Router quanlynhapHang
router.get('/quan-li-nhapHang', adminController.quanlynhapHang);


//Router quanlychiTietXuatHang
router.get('/quan-li-chiTietXuatHang', adminController.quanlychiTietXuatHang);


//Router quanlychiTietNhapHang
router.get('/quan-li-chiTietNhapHang', adminController.quanlychiTietNhapHang);


//Module export
module.exports = router;
