//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const taikhoanDatabase = require('../../databases/taikhoan.database');
const TaiKhoan = require('../../models/taikhoan');

module.exports.login = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;

        if (input && input.username && input.password) {
            let username = input.username;
            let password = input.password;
            let rememberLogin = input.rememberLogin;

            let taikhoans = await taikhoanDatabase.get({username: username, password: password});

            if (taikhoans && taikhoans[0]) {              
                if (rememberLogin) {
                    response.cookie("loginInfo", JSON.stringify(taikhoans[0]), {signed: true});
                }

                response.send({ result: 'success', taikhoan: taikhoans[0] });
            } else {
                response.send({ result: 'fail', message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ ' });
            }
        } else {
            response.send({ result: 'fail', message: 'Thiếu Tên đăng nhập hoặc mật khẩu ' });
        }

        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.logout = async function (request, response, next) {
    try {
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
