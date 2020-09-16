//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const adminController = require('../controllers/admin.controller');

//Router main
router.get('/', adminController.tongquat);

//Router tongquat
router.get('/tong-quat', adminController.tongquat);

//Router quanlyban
router.get('/quan-ly-ban', adminController.quanlyban);

//Router quanlycthd
router.get('/quan-ly-cthd', adminController.quanlycthd);

//Router quanlyctkm
router.get('/quan-ly-ctkm', adminController.quanlyctkm);

//Router quanlydatban
router.get('/quan-ly-dat-ban', adminController.quanlydatban);

//Router quanlyhoadon
router.get('/quan-ly-hoa-don', adminController.quanlyhoadon);

//Router quanlykhachhang
router.get('/quan-ly-khach-hang', adminController.quanlykhachhang);

//Router quanlykhuyenmai
router.get('/quan-ly-khuyen-mai', adminController.quanlykhuyenmai);

//Router quanlyloaisanpham
router.get('/quan-ly-loai-san-pham', adminController.quanlyloaisanpham);

//Router quanlynhanvien
router.get('/quan-ly-nhan-vien', adminController.quanlynhanvien);

//Router quanlysanpham
router.get('/quan-ly-san-pham', adminController.quanlysanpham);

//Router quanlytaikhoan
router.get('/quan-ly-tai-khoan', adminController.quanlytaikhoan);

//Router quanlythanhtoanhoadon
router.get('/quan-ly-thanh-toan-hoa-don', adminController.quanlythanhtoanhoadon);

//Module export
module.exports = router;