//Import Controllers
const errorController = require('./error.controller');

//Import Databases
const taikhoanDatabase = require('../databases/taikhoan.database');

//Import Models
const TaiKhoan = require('../models/taikhoan');

//Routings

//Routing Tongquat 
module.exports.tongquat = async function (request, response, next) {
    try {
        response.render('admins/tong-quat', {
            sidebarActiveTongquat: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Tổng quát', link: '/admin/tong-quat', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlyban = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-ban', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý bàn', link: '/admin/quan-ly-ban', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlycthd = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-cthd', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý chi tiết hóa đơn', link: '/admin/quan-ly-cthd', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlyctkm = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-ctkm', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý chi tiết khuyến mãi', link: '/admin/quan-ly-ctkm', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlydatban = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-dat-ban', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý đặt bàn', link: '/admin/quan-ly-dat-ban', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlyhoadon = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-hoa-don', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý hóa đơn', link: '/admin/quan-ly-hoa-don', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlykhachhang = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-khach-hang', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý khách hàng', link: '/admin/quan-ly-khach-hang', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlykhuyenmai = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-khuyen-mai', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý khuyến mãi', link: '/admin/quan-ly-khuyen-mai', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlyloaisanpham = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-loai-san-pham', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý loại sản phẩm', link: '/admin/quan-ly-loai-san-pham', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlynhanvien = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-nhan-vien', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nhân viên', link: '/admin/quan-ly-nhan-vien', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlysanpham = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-san-pham', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý sản phẩm', link: '/admin/quan-ly-san-pham', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlytaikhoan = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-tai-khoan', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý tài khoản', link: '/admin/quan-ly-tai-khoan', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.quanlythanhtoanhoadon = async function (request, response, next) {
    try {
        response.render('admins/quan-ly-thanh-toan-hoa-don', {
            sidebarActiveQuanlytaikhoan: 'active',
            breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý thanh toán hóa đơn', link: '/admin/quan-ly-thanh-toan-hoa-don', isActive: 'active' }],
            taikhoan: new TaiKhoan(1, 'admin')
        });
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
