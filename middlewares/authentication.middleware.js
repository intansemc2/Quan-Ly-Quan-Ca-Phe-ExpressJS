//Import liblaries
const jwt = require('jsonwebtoken');

//Import Databases
const taikhoanDatabase = require('../databases/taikhoan.database');

//Import Models
const TaiKhoan = require('../models/taikhoan');

async function basicAuthentication(request, response, isInvalidAccount) {
    //Lấy JWT token
    let jwtToken = request.cookies.jwtToken;
    if (!jwtToken) {
        response.redirect('/login');
        return;
    }

    //Lấy username và password
    let { username, password } = jwt.verify(jwtToken, process.env.JSON_WEB_TOKEN_SECRET_KEY);
    if (!username || !password) {
        response.redirect('/login');
        return;
    }

    //Lấy danh sách tài khoản hợp lệ
    let taikhoans = await taikhoanDatabase.get({ username: username, password: password });
    if (!taikhoans || taikhoans.length < 0) {
        response.redirect('/login');
        return;
    }

    //Kiểm tra một tài khoản có đúng hay không
    let taikhoan = taikhoans[0];
    return isInvalidAccount(taikhoan);
}

module.exports.authentication = async function (request, response, next) {
    let isValid = basicAuthentication(request, response, (tk) => true);
    if (isValid) {
        next();
    } else {
        response.redirect('/login');
    }
};

module.exports.adminAuthentication = async function (request, response, next) {
    let isValid = basicAuthentication(request, response, (tk) => tk.loai === TaiKhoan.LOAI_ADMIN);
    if (isValid) {
        next();
    } else {
        response.redirect('/login');
    }
};

module.exports.userAuthentication = async function (request, response, next) {
    let isValid = basicAuthentication(request, response, (tk) => tk.loai === TaiKhoan.LOAI_ADMIN || tk.loai === TaiKhoan.LOAI_STAFF || tk.loai === TaiKhoan.LOAI_USER);
    if (isValid) {
        next();
    } else {
        response.redirect('/login');
    }
};

module.exports.staffAuthentication = async function (request, response, next) {
    let isValid = basicAuthentication(request, response, (tk) => (tk) => tk.loai === TaiKhoan.LOAI_ADMIN || tk.loai === TaiKhoan.LOAI_STAFF);
    if (isValid) {
        next();
    } else {
        response.redirect('/login');
    }
};
