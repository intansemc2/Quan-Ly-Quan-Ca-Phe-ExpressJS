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

${
    datas.map(data => {
        //Pre-process
        let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
        let tablenameClass = ccfs.convertNameToJSClass(data.classname);
        let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

        let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
        let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

        return `module.exports.quanly${tablenameFile} = async function (request, response, next) {
try {
    response.render('admins/quan-ly-${tablenameFile}', {
        sidebarActiveQuanly${tablenameFile}: 'active',
        breadcrumbs: [{ name: 'Admin', link: '/admin'}, { name: 'Quản lý ${data.speak.toLowerCase()}', link: '/admin/quan-ly-${tablenameFile}', isActive: 'active' }],
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
