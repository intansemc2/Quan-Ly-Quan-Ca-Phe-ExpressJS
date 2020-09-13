//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const taikhoanDatabase = require('../../databases/taikhoan.database');
const TaiKhoan = require('../../models/taikhoan');

module.exports.login = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;

        if (input) {
            let username = input.username;
            let password = input.password;

            if (username && password) {
                let taikhoans = await taikhoanDatabase.get(input);

                if (taikhoans && taikhoans[0]) {
                    response.send({result: 'success', taikhoan: taikhoans[0]});
                }
                else {
                    response.send({result: 'fail', message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ '});
                }
            }
            else {
                response.send({result: 'fail', message: 'Thiếu Tên đăng nhập hoặc mật khẩu '});
            }
        }
        else {
            response.send({result: 'fail', message: 'Thiếu Input '});
        }

        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

