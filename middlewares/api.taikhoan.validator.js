//Import Models
const TaiKhoan = require('../models/taikhoan');

//Validators
module.exports.postValidator = function(request, response, next) {
    let idTaiKhoan = request.body.idTaiKhoan;
    let username = request.body.username;
    let password = request.body.password;
    let loai = request.body.loai;

    let errors = [];

    if (!username) {
        errors.push('Tên đăng nhập không được để trống ');
    }

    if (!password) {
        errors.push('Mật khẩu không được để trống ');
    }

    if (!loai) {
        errors.push('Loại tài khoản không được để trống ');
    }

    if (errors.length > 0) {
        response.json({errors: errors});
        return;
    }
    
    next();
}