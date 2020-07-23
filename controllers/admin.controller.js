//Import Controllers
const errorController = require('./error.controller');

//Import Databases
const taikhoanDatabase = require('../databases/taikhoan.database');

//Import Models
const TaiKhoan = require('../models/taikhoan');

module.exports.tongquat = async function (request, response, next) {
    try {
        response.render('admins/tong-quat', {
            sidebarActiveTongquat: 'active',
            breadcrumbs: [{ name: 'Tổng quát', link: '/admin/tong-quat', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin'),
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlytaikhoan = async function (request, response, next) {
    try {
        let taikhoans = await taikhoanDatabase.get();
        if (!taikhoans) {
            taikhoans = [];
        }
        response.render('admins/quan-ly-tai-khoan', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Quản lý tài khoản', link: '/admin/quan-ly-tai-khoan', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin'),
            taikhoans: taikhoans,
            taikhoansTypes: TaiKhoan.LOAI_NAMES
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
