/*** 
File: api.router.js 
***/

//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller

        const apitaiKhoanController = require('../controllers/api/api.taiKhoan.controller');
        
        const apinguonSanPhamController = require('../controllers/api/api.nguonSanPham.controller');
        
        const apibanController = require('../controllers/api/api.ban.controller');
        
        const apisanPhamController = require('../controllers/api/api.sanPham.controller');
        
        const apinhanVienController = require('../controllers/api/api.nhanVien.controller');
        
        const apikhachHangController = require('../controllers/api/api.khachHang.controller');
        
        const apixuatHangController = require('../controllers/api/api.xuatHang.controller');
        
        const apinhapHangController = require('../controllers/api/api.nhapHang.controller');
        
        const apichiTietXuatHangController = require('../controllers/api/api.chiTietXuatHang.controller');
        
        const apichiTietNhapHangController = require('../controllers/api/api.chiTietNhapHang.controller');
        


        //Routers for taiKhoan  
        router.get('/taiKhoan', apitaiKhoanController.get);  
        router.post('/taiKhoan', apitaiKhoanController.post);  
        router.put('/taiKhoan', apitaiKhoanController.put);  
        router.patch('/taiKhoan', apitaiKhoanController.patch);  
        router.delete('/taiKhoan', apitaiKhoanController.delete);  
        router.use('/taiKhoan/exists', apitaiKhoanController.exists);  
        
        //Routers for nguonSanPham  
        router.get('/nguonSanPham', apinguonSanPhamController.get);  
        router.post('/nguonSanPham', apinguonSanPhamController.post);  
        router.put('/nguonSanPham', apinguonSanPhamController.put);  
        router.patch('/nguonSanPham', apinguonSanPhamController.patch);  
        router.delete('/nguonSanPham', apinguonSanPhamController.delete);  
        router.use('/nguonSanPham/exists', apinguonSanPhamController.exists);  
        
        //Routers for ban  
        router.get('/ban', apibanController.get);  
        router.post('/ban', apibanController.post);  
        router.put('/ban', apibanController.put);  
        router.patch('/ban', apibanController.patch);  
        router.delete('/ban', apibanController.delete);  
        router.use('/ban/exists', apibanController.exists);  
        
        //Routers for sanPham  
        router.get('/sanPham', apisanPhamController.get);  
        router.post('/sanPham', apisanPhamController.post);  
        router.put('/sanPham', apisanPhamController.put);  
        router.patch('/sanPham', apisanPhamController.patch);  
        router.delete('/sanPham', apisanPhamController.delete);  
        router.use('/sanPham/exists', apisanPhamController.exists);  
        
        //Routers for nhanVien  
        router.get('/nhanVien', apinhanVienController.get);  
        router.post('/nhanVien', apinhanVienController.post);  
        router.put('/nhanVien', apinhanVienController.put);  
        router.patch('/nhanVien', apinhanVienController.patch);  
        router.delete('/nhanVien', apinhanVienController.delete);  
        router.use('/nhanVien/exists', apinhanVienController.exists);  
        
        //Routers for khachHang  
        router.get('/khachHang', apikhachHangController.get);  
        router.post('/khachHang', apikhachHangController.post);  
        router.put('/khachHang', apikhachHangController.put);  
        router.patch('/khachHang', apikhachHangController.patch);  
        router.delete('/khachHang', apikhachHangController.delete);  
        router.use('/khachHang/exists', apikhachHangController.exists);  
        
        //Routers for xuatHang  
        router.get('/xuatHang', apixuatHangController.get);  
        router.post('/xuatHang', apixuatHangController.post);  
        router.put('/xuatHang', apixuatHangController.put);  
        router.patch('/xuatHang', apixuatHangController.patch);  
        router.delete('/xuatHang', apixuatHangController.delete);  
        router.use('/xuatHang/exists', apixuatHangController.exists);  
        
        //Routers for nhapHang  
        router.get('/nhapHang', apinhapHangController.get);  
        router.post('/nhapHang', apinhapHangController.post);  
        router.put('/nhapHang', apinhapHangController.put);  
        router.patch('/nhapHang', apinhapHangController.patch);  
        router.delete('/nhapHang', apinhapHangController.delete);  
        router.use('/nhapHang/exists', apinhapHangController.exists);  
        
        //Routers for chiTietXuatHang  
        router.get('/chiTietXuatHang', apichiTietXuatHangController.get);  
        router.post('/chiTietXuatHang', apichiTietXuatHangController.post);  
        router.put('/chiTietXuatHang', apichiTietXuatHangController.put);  
        router.patch('/chiTietXuatHang', apichiTietXuatHangController.patch);  
        router.delete('/chiTietXuatHang', apichiTietXuatHangController.delete);  
        router.use('/chiTietXuatHang/exists', apichiTietXuatHangController.exists);  
        
        //Routers for chiTietNhapHang  
        router.get('/chiTietNhapHang', apichiTietNhapHangController.get);  
        router.post('/chiTietNhapHang', apichiTietNhapHangController.post);  
        router.put('/chiTietNhapHang', apichiTietNhapHangController.put);  
        router.patch('/chiTietNhapHang', apichiTietNhapHangController.patch);  
        router.delete('/chiTietNhapHang', apichiTietNhapHangController.delete);  
        router.use('/chiTietNhapHang/exists', apichiTietNhapHangController.exists);  
        


//Module export
module.exports = router;

