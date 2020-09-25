/*** 
File: api.router.js 
***/

//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller

        const apiTaikhoanController = require('../controllers/api/api.taikhoan.controller');
        
        const apiNguonsanphamController = require('../controllers/api/api.nguonsanpham.controller');
        
        const apiBanController = require('../controllers/api/api.ban.controller');
        
        const apiSanphamController = require('../controllers/api/api.sanpham.controller');
        
        const apiNhanvienController = require('../controllers/api/api.nhanvien.controller');
        
        const apiKhachhangController = require('../controllers/api/api.khachhang.controller');
        
        const apiXuathangController = require('../controllers/api/api.xuathang.controller');
        
        const apiNhaphangController = require('../controllers/api/api.nhaphang.controller');
        
        const apiChitietxuathangController = require('../controllers/api/api.chitietxuathang.controller');
        
        const apiChitietnhaphangController = require('../controllers/api/api.chitietnhaphang.controller');
        


        //Routers for Taikhoan  
        router.get('/taikhoan', apiTaikhoanController.get);  
        router.post('/taikhoan', apiTaikhoanController.post);  
        router.put('/taikhoan', apiTaikhoanController.put);  
        router.patch('/taikhoan', apiTaikhoanController.patch);  
        router.delete('/taikhoan', apiTaikhoanController.delete);  
        router.use('/taikhoan/exists', apiTaikhoanController.exists);  
        
        //Routers for Nguonsanpham  
        router.get('/nguonsanpham', apiNguonsanphamController.get);  
        router.post('/nguonsanpham', apiNguonsanphamController.post);  
        router.put('/nguonsanpham', apiNguonsanphamController.put);  
        router.patch('/nguonsanpham', apiNguonsanphamController.patch);  
        router.delete('/nguonsanpham', apiNguonsanphamController.delete);  
        router.use('/nguonsanpham/exists', apiNguonsanphamController.exists);  
        
        //Routers for Ban  
        router.get('/ban', apiBanController.get);  
        router.post('/ban', apiBanController.post);  
        router.put('/ban', apiBanController.put);  
        router.patch('/ban', apiBanController.patch);  
        router.delete('/ban', apiBanController.delete);  
        router.use('/ban/exists', apiBanController.exists);  
        
        //Routers for Sanpham  
        router.get('/sanpham', apiSanphamController.get);  
        router.post('/sanpham', apiSanphamController.post);  
        router.put('/sanpham', apiSanphamController.put);  
        router.patch('/sanpham', apiSanphamController.patch);  
        router.delete('/sanpham', apiSanphamController.delete);  
        router.use('/sanpham/exists', apiSanphamController.exists);  
        
        //Routers for Nhanvien  
        router.get('/nhanvien', apiNhanvienController.get);  
        router.post('/nhanvien', apiNhanvienController.post);  
        router.put('/nhanvien', apiNhanvienController.put);  
        router.patch('/nhanvien', apiNhanvienController.patch);  
        router.delete('/nhanvien', apiNhanvienController.delete);  
        router.use('/nhanvien/exists', apiNhanvienController.exists);  
        
        //Routers for Khachhang  
        router.get('/khachhang', apiKhachhangController.get);  
        router.post('/khachhang', apiKhachhangController.post);  
        router.put('/khachhang', apiKhachhangController.put);  
        router.patch('/khachhang', apiKhachhangController.patch);  
        router.delete('/khachhang', apiKhachhangController.delete);  
        router.use('/khachhang/exists', apiKhachhangController.exists);  
        
        //Routers for Xuathang  
        router.get('/xuathang', apiXuathangController.get);  
        router.post('/xuathang', apiXuathangController.post);  
        router.put('/xuathang', apiXuathangController.put);  
        router.patch('/xuathang', apiXuathangController.patch);  
        router.delete('/xuathang', apiXuathangController.delete);  
        router.use('/xuathang/exists', apiXuathangController.exists);  
        
        //Routers for Nhaphang  
        router.get('/nhaphang', apiNhaphangController.get);  
        router.post('/nhaphang', apiNhaphangController.post);  
        router.put('/nhaphang', apiNhaphangController.put);  
        router.patch('/nhaphang', apiNhaphangController.patch);  
        router.delete('/nhaphang', apiNhaphangController.delete);  
        router.use('/nhaphang/exists', apiNhaphangController.exists);  
        
        //Routers for Chitietxuathang  
        router.get('/chitietxuathang', apiChitietxuathangController.get);  
        router.post('/chitietxuathang', apiChitietxuathangController.post);  
        router.put('/chitietxuathang', apiChitietxuathangController.put);  
        router.patch('/chitietxuathang', apiChitietxuathangController.patch);  
        router.delete('/chitietxuathang', apiChitietxuathangController.delete);  
        router.use('/chitietxuathang/exists', apiChitietxuathangController.exists);  
        
        //Routers for Chitietnhaphang  
        router.get('/chitietnhaphang', apiChitietnhaphangController.get);  
        router.post('/chitietnhaphang', apiChitietnhaphangController.post);  
        router.put('/chitietnhaphang', apiChitietnhaphangController.put);  
        router.patch('/chitietnhaphang', apiChitietnhaphangController.patch);  
        router.delete('/chitietnhaphang', apiChitietnhaphangController.delete);  
        router.use('/chitietnhaphang/exists', apiChitietnhaphangController.exists);  
        
