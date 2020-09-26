/*** 
File: api.router.js 
***/

//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller

const apitaikhoanController = require('../controllers/api/api.taikhoan.controller');
const apinguonsanphamController = require('../controllers/api/api.nguonsanpham.controller');
const apibanController = require('../controllers/api/api.ban.controller');
const apisanphamController = require('../controllers/api/api.sanpham.controller');
const apinhanvienController = require('../controllers/api/api.nhanvien.controller');
const apikhachhangController = require('../controllers/api/api.khachhang.controller');
const apixuathangController = require('../controllers/api/api.xuathang.controller');
const apinhaphangController = require('../controllers/api/api.nhaphang.controller');
const apichitietxuathangController = require('../controllers/api/api.chitietxuathang.controller');
const apichitietnhaphangController = require('../controllers/api/api.chitietnhaphang.controller');
const apiaccountmanagerController = require('../controllers/api/api.account.manager.controller');

//Routers for taikhoan
router.get('/taikhoan', apitaikhoanController.get);
router.post('/taikhoan', apitaikhoanController.post);
router.put('/taikhoan', apitaikhoanController.put);
router.patch('/taikhoan', apitaikhoanController.patch);
router.delete('/taikhoan', apitaikhoanController.delete);
router.use('/taikhoan/exists', apitaikhoanController.exists);

//Routers for nguonsanpham
router.get('/nguonsanpham', apinguonsanphamController.get);
router.post('/nguonsanpham', apinguonsanphamController.post);
router.put('/nguonsanpham', apinguonsanphamController.put);
router.patch('/nguonsanpham', apinguonsanphamController.patch);
router.delete('/nguonsanpham', apinguonsanphamController.delete);
router.use('/nguonsanpham/exists', apinguonsanphamController.exists);

//Routers for ban
router.get('/ban', apibanController.get);
router.post('/ban', apibanController.post);
router.put('/ban', apibanController.put);
router.patch('/ban', apibanController.patch);
router.delete('/ban', apibanController.delete);
router.use('/ban/exists', apibanController.exists);

//Routers for sanpham
router.get('/sanpham', apisanphamController.get);
router.post('/sanpham', apisanphamController.post);
router.put('/sanpham', apisanphamController.put);
router.patch('/sanpham', apisanphamController.patch);
router.delete('/sanpham', apisanphamController.delete);
router.use('/sanpham/exists', apisanphamController.exists);

//Routers for nhanvien
router.get('/nhanvien', apinhanvienController.get);
router.post('/nhanvien', apinhanvienController.post);
router.put('/nhanvien', apinhanvienController.put);
router.patch('/nhanvien', apinhanvienController.patch);
router.delete('/nhanvien', apinhanvienController.delete);
router.use('/nhanvien/exists', apinhanvienController.exists);

//Routers for khachhang
router.get('/khachhang', apikhachhangController.get);
router.post('/khachhang', apikhachhangController.post);
router.put('/khachhang', apikhachhangController.put);
router.patch('/khachhang', apikhachhangController.patch);
router.delete('/khachhang', apikhachhangController.delete);
router.use('/khachhang/exists', apikhachhangController.exists);

//Routers for xuathang
router.get('/xuathang', apixuathangController.get);
router.post('/xuathang', apixuathangController.post);
router.put('/xuathang', apixuathangController.put);
router.patch('/xuathang', apixuathangController.patch);
router.delete('/xuathang', apixuathangController.delete);
router.use('/xuathang/exists', apixuathangController.exists);

//Routers for nhaphang
router.get('/nhaphang', apinhaphangController.get);
router.post('/nhaphang', apinhaphangController.post);
router.put('/nhaphang', apinhaphangController.put);
router.patch('/nhaphang', apinhaphangController.patch);
router.delete('/nhaphang', apinhaphangController.delete);
router.use('/nhaphang/exists', apinhaphangController.exists);

//Routers for chitietxuathang
router.get('/chitietxuathang', apichitietxuathangController.get);
router.post('/chitietxuathang', apichitietxuathangController.post);
router.put('/chitietxuathang', apichitietxuathangController.put);
router.patch('/chitietxuathang', apichitietxuathangController.patch);
router.delete('/chitietxuathang', apichitietxuathangController.delete);
router.use('/chitietxuathang/exists', apichitietxuathangController.exists);

//Routers for chitietnhaphang
router.get('/chitietnhaphang', apichitietnhaphangController.get);
router.post('/chitietnhaphang', apichitietnhaphangController.post);
router.put('/chitietnhaphang', apichitietnhaphangController.put);
router.patch('/chitietnhaphang', apichitietnhaphangController.patch);
router.delete('/chitietnhaphang', apichitietnhaphangController.delete);
router.use('/chitietnhaphang/exists', apichitietnhaphangController.exists);

//Routers for accountmanager
router.get('/account.manager', apiaccountmanagerController.get);
router.post('/account.manager', apiaccountmanagerController.post);
router.put('/account.manager', apiaccountmanagerController.put);
router.patch('/account.manager', apiaccountmanagerController.patch);
router.delete('/account.manager', apiaccountmanagerController.delete);
router.use('/account.manager/exists', apiaccountmanagerController.exists);

//Module export
module.exports = router;
