/*** 
File: admin.controller.js 
***/

//Import Controllers
const errorController = require('./error.controller');

//Import Databases
const taikhoanDatabase = require('../databases/taiKhoan.database');

//Import Models
const TaiKhoan = require('../models/taiKhoan');

//Routings

//Routing Tongquat 
module.exports.tongquat = async function (request, response, next) {
try {
    response.render('admins/tong-quat', {
        sidebarActiveTongquat: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Tổng quát', link: '/admin/tong-quat', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};

module.exports.quanlytaiKhoan = async function (request, response, next) {
try {
    response.render('admins/quan-li-taiKhoan', {
        sidebarActiveQuanlytaiKhoan: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý tài khoản', link: '/admin/quan-li-taiKhoan', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlynguonSanPham = async function (request, response, next) {
try {
    response.render('admins/quan-li-nguonSanPham', {
        sidebarActiveQuanlynguonSanPham: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nguồn sản phẩm', link: '/admin/quan-li-nguonSanPham', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlyban = async function (request, response, next) {
try {
    response.render('admins/quan-li-ban', {
        sidebarActiveQuanlyban: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý bàn', link: '/admin/quan-li-ban', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlysanPham = async function (request, response, next) {
try {
    response.render('admins/quan-li-sanPham', {
        sidebarActiveQuanlysanPham: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý sản phẩm', link: '/admin/quan-li-sanPham', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlynhanVien = async function (request, response, next) {
try {
    response.render('admins/quan-li-nhanVien', {
        sidebarActiveQuanlynhanVien: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nhân viên', link: '/admin/quan-li-nhanVien', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlykhachHang = async function (request, response, next) {
try {
    response.render('admins/quan-li-khachHang', {
        sidebarActiveQuanlykhachHang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý khách hàng', link: '/admin/quan-li-khachHang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlyxuatHang = async function (request, response, next) {
try {
    response.render('admins/quan-li-xuatHang', {
        sidebarActiveQuanlyxuatHang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý xuất hàng', link: '/admin/quan-li-xuatHang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlynhapHang = async function (request, response, next) {
try {
    response.render('admins/quan-li-nhapHang', {
        sidebarActiveQuanlynhapHang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nhập hàng', link: '/admin/quan-li-nhapHang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlychiTietXuatHang = async function (request, response, next) {
try {
    response.render('admins/quan-li-chiTietXuatHang', {
        sidebarActiveQuanlychiTietXuatHang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý chi tiết xuất hàng', link: '/admin/quan-li-chiTietXuatHang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlychiTietNhapHang = async function (request, response, next) {
try {
    response.render('admins/quan-li-chiTietNhapHang', {
        sidebarActiveQuanlychiTietNhapHang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý chi tiết nhập hàng', link: '/admin/quan-li-chiTietNhapHang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
