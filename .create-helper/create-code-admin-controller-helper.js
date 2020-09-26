const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `/*** 
File: admin.controller.js 
***/
`;
contents += `
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

${
    datas.map(data => {
        //Pre-process
        let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

        return `module.exports.quanly${tablenameRemoved} = async function (request, response, next) {
try {
    response.render('admins/quan-li-${tablenameRemoved}', {
        sidebarActiveQuanly${tablenameRemoved}: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý ${data.speak.toLowerCase()}', link: '/admin/quan-li-${tablenameRemoved}', isActive: 'active' }],
        taiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};`;
    }).join('\n') 
}
`;

ccfs.writeStringSync(`${__dirname}/results/controllers`, `admin.controller.js`, contents);
