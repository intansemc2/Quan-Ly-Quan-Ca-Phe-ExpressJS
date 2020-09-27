//Import library
const crypto = require('crypto');

//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const taikhoanDatabase = require('../../databases/taiKhoan.database');

//Import Models
const TaiKhoan = require('../../models/taiKhoan');

//Constance
const COOKIE_OPTIONS = { sameSite: 'Lax', maxAge: 30 * 24 * 3600 * 1000 /* 30 day */, httpOnly: true, signed: true };

//Get login information
module.exports.get = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        let tenDangNhap = request.signedCookies.tenDangNhap;
        let matKhau = request.signedCookies.matKhau;

        if (tenDangNhap && matKhau) {
            output = {
                cookie: { tenDangNhap: tenDangNhap, matKhau: matKhau },
            };
        }

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Add new login information
module.exports.post = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = input;

        let tenDangNhap = input.tenDangNhap;
        let matKhau = input.matKhau;
        let isHashed = input.isHashed;

        if (!isHashed) {
            matKhau = crypto.createHash('MD5').update(matKhau).digest('hex');
        }

        let right = await taikhoanDatabase.exists({ tenDangNhap: tenDangNhap, matKhau: matKhau });

        if (right) {
            response.cookie('tenDangNhap', tenDangNhap, COOKIE_OPTIONS);
            response.cookie('matKhau', matKhau, COOKIE_OPTIONS);

            output = {
                cookie: true,
            };
        } else {
            output = {
                cookie: false,
            };
        }

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Add new login information if not exists
//Edit login information if exists
module.exports.put = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = input;

        let tenDangNhap = request.signedCookies.tenDangNhap;
        let matKhau = request.signedCookies.matKhau;

        if (tenDangNhap && matKhau) {
            module.exports.patch(request, response, next);
        } else {
            module.exports.post(request, response, next);
        }
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Edit login information
module.exports.patch = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = input;

        let tenDangNhap = request.signedCookies.tenDangNhap;
        let matKhau = request.signedCookies.matKhau;
        let isHashed = input.isHashed;

        if (!isHashed) {
            matKhau = crypto.createHash('MD5').update(matKhau).digest('hex');
        }

        response.cookie('tenDangNhap', tenDangNhap, COOKIE_OPTIONS);
        response.cookie('matKhau', matKhau, COOKIE_OPTIONS);

        output = {
            cookie: true,
        };

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Delete login information
module.exports.delete = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        response.clearCookie('tenDangNhap');
        response.clearCookie('matKhau');

        output = {
            cookie: true,
        };

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Check login information
module.exports.exists = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        let tenDangNhap = request.signedCookies.tenDangNhap;
        let matKhau = request.signedCookies.matKhau;

        output = {
            cookie: tenDangNhap && matKhau,
        };

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
