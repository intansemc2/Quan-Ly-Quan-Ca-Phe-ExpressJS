//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const apiBanController = require('../controllers/api/api.ban.controller');
const apiCthdController = require('../controllers/api/api.cthd.controller');
const apiCtkmController = require('../controllers/api/api.ctkm.controller');
const apiDatbanController = require('../controllers/api/api.datban.controller');
const apiHoadonController = require('../controllers/api/api.hoadon.controller');
const apiKhachhangController = require('../controllers/api/api.khachhang.controller');
const apiKhuyenmaiController = require('../controllers/api/api.khuyenmai.controller');
const apiLoaisanphamController = require('../controllers/api/api.loaisanpham.controller');
const apiNhanvienController = require('../controllers/api/api.nhanvien.controller');
const apiSanphamController = require('../controllers/api/api.sanpham.controller');
const apiTaikhoanController = require('../controllers/api/api.taikhoan.controller');

//Import Validator
const apiTaikhoanValidator = require('../middlewares/api.taikhoan.validator');

//Routers for Ban  
router.get('/ban', apiBanController.get);  
router.post('/ban', apiBanController.post);  
router.put('/ban', apiBanController.put);  
router.patch('/ban', apiBanController.patch);  
router.delete('/ban', apiBanController.delete);  
router.use('/ban/exists', apiBanController.exists);  


//Routers for Cthd  
router.get('/cthd', apiCthdController.get);  
router.post('/cthd', apiCthdController.post);  
router.put('/cthd', apiCthdController.put);  
router.patch('/cthd', apiCthdController.patch);  
router.delete('/cthd', apiCthdController.delete);  
router.use('/cthd/exists', apiCthdController.exists);  


//Routers for Ctkm  
router.get('/ctkm', apiCtkmController.get);  
router.post('/ctkm', apiCtkmController.post);  
router.put('/ctkm', apiCtkmController.put);  
router.patch('/ctkm', apiCtkmController.patch);  
router.delete('/ctkm', apiCtkmController.delete);  
router.use('/ctkm/exists', apiCtkmController.exists);  


//Routers for Datban  
router.get('/dat-ban', apiDatbanController.get);  
router.post('/dat-ban', apiDatbanController.post);  
router.put('/dat-ban', apiDatbanController.put);  
router.patch('/dat-ban', apiDatbanController.patch);  
router.delete('/dat-ban', apiDatbanController.delete);  
router.use('/dat-ban/exists', apiDatbanController.exists);  


//Routers for Hoadon  
router.get('/hoa-don', apiHoadonController.get);  
router.post('/hoa-don', apiHoadonController.post);  
router.put('/hoa-don', apiHoadonController.put);  
router.patch('/hoa-don', apiHoadonController.patch);  
router.delete('/hoa-don', apiHoadonController.delete);  
router.use('/hoa-don/exists', apiHoadonController.exists);  


//Routers for Khachhang  
router.get('/khach-hang', apiKhachhangController.get);  
router.post('/khach-hang', apiKhachhangController.post);  
router.put('/khach-hang', apiKhachhangController.put);  
router.patch('/khach-hang', apiKhachhangController.patch);  
router.delete('/khach-hang', apiKhachhangController.delete);  
router.use('/khach-hang/exists', apiKhachhangController.exists);  


//Routers for Khuyenmai  
router.get('/khuyen-mai', apiKhuyenmaiController.get);  
router.post('/khuyen-mai', apiKhuyenmaiController.post);  
router.put('/khuyen-mai', apiKhuyenmaiController.put);  
router.patch('/khuyen-mai', apiKhuyenmaiController.patch);  
router.delete('/khuyen-mai', apiKhuyenmaiController.delete);  
router.use('/khuyen-mai/exists', apiKhuyenmaiController.exists);  


//Routers for Loaisanpham  
router.get('/loai-san-pham', apiLoaisanphamController.get);  
router.post('/loai-san-pham', apiLoaisanphamController.post);  
router.put('/loai-san-pham', apiLoaisanphamController.put);  
router.patch('/loai-san-pham', apiLoaisanphamController.patch);  
router.delete('/loai-san-pham', apiLoaisanphamController.delete);  
router.use('/loai-san-pham/exists', apiLoaisanphamController.exists);  


//Routers for Nhanvien  
router.get('/nhan-vien', apiNhanvienController.get);  
router.post('/nhan-vien', apiNhanvienController.post);  
router.put('/nhan-vien', apiNhanvienController.put);  
router.patch('/nhan-vien', apiNhanvienController.patch);  
router.delete('/nhan-vien', apiNhanvienController.delete);  
router.use('/nhan-vien/exists', apiNhanvienController.exists);  


//Routers for Sanpham  
router.get('/san-pham', apiSanphamController.get);  
router.post('/san-pham', apiSanphamController.post);  
router.put('/san-pham', apiSanphamController.put);  
router.patch('/san-pham', apiSanphamController.patch);  
router.delete('/san-pham', apiSanphamController.delete);  
router.use('/san-pham/exists', apiSanphamController.exists);  


//Routers for Taikhoan  
router.get('/tai-khoan', apiTaikhoanController.get);  
router.post('/tai-khoan', apiTaikhoanValidator.postValidator, apiTaikhoanController.post);  
router.put('/tai-khoan', apiTaikhoanController.put);  
router.patch('/tai-khoan', apiTaikhoanController.patch);  
router.delete('/tai-khoan', apiTaikhoanController.delete);  
router.use('/tai-khoan/exists', apiTaikhoanController.exists); 
router.use('/tai-khoan/types', apiTaikhoanController.types); 

//Module export
module.exports = router;