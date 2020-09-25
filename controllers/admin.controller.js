/*** 
File: admin.controller.js 
***/

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
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};

module.exports.quanlytaikhoan = async function (request, response, next) {
try {
    response.render('admins/quan-ly-taikhoan', {
        sidebarActiveQuanlytaikhoan: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý tài khoản', link: '/admin/quan-ly-taikhoan', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlynguonsanpham = async function (request, response, next) {
try {
    response.render('admins/quan-ly-nguonsanpham', {
        sidebarActiveQuanlynguonsanpham: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nguồn sản phẩm', link: '/admin/quan-ly-nguonsanpham', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlyban = async function (request, response, next) {
try {
    response.render('admins/quan-ly-ban', {
        sidebarActiveQuanlyban: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý bàn', link: '/admin/quan-ly-ban', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlysanpham = async function (request, response, next) {
try {
    response.render('admins/quan-ly-sanpham', {
        sidebarActiveQuanlysanpham: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý sản phẩm', link: '/admin/quan-ly-sanpham', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlynhanvien = async function (request, response, next) {
try {
    response.render('admins/quan-ly-nhanvien', {
        sidebarActiveQuanlynhanvien: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nhân viên', link: '/admin/quan-ly-nhanvien', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlykhachhang = async function (request, response, next) {
try {
    response.render('admins/quan-ly-khachhang', {
        sidebarActiveQuanlykhachhang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý khách hàng', link: '/admin/quan-ly-khachhang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlyxuathang = async function (request, response, next) {
try {
    response.render('admins/quan-ly-xuathang', {
        sidebarActiveQuanlyxuathang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý xuất hàng', link: '/admin/quan-ly-xuathang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlynhaphang = async function (request, response, next) {
try {
    response.render('admins/quan-ly-nhaphang', {
        sidebarActiveQuanlynhaphang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý nhập hàng', link: '/admin/quan-ly-nhaphang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlychitietxuathang = async function (request, response, next) {
try {
    response.render('admins/quan-ly-chitietxuathang', {
        sidebarActiveQuanlychitietxuathang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý chi tiết xuất hàng', link: '/admin/quan-ly-chitietxuathang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
module.exports.quanlychitietnhaphang = async function (request, response, next) {
try {
    response.render('admins/quan-ly-chitietnhaphang', {
        sidebarActiveQuanlychitietnhaphang: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý chi tiết nhập hàng', link: '/admin/quan-ly-chitietnhaphang', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
