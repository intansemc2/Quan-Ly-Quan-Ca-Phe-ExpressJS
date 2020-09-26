//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const taikhoanDatabase = require('../../databases/taiKhoan.database');

//Import Models
const TaiKhoan = require('../../models/taiKhoan');

//Get login information
module.exports.get = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = input;

        //

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

        //

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

        //

        response.json(output);
        next();
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

        //

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
        let output = input;

        //

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
        let output = input;

        //

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
