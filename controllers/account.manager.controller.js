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
module.exports.index = async function (request, response, next) {
try {
    response.render('account.manager/index', {
        sessionTaiKhoan: new TaiKhoan(1, 'admin')
    });
    next();
} catch (error) {
    errorController.handle500(error, request, response, next);
}
};
