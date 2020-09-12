//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const nhanvienDatabase = require('../../databases/nhanvien.database');

module.exports.get = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await nhanvienDatabase.get(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.post = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await nhanvienDatabase.post(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.put = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await nhanvienDatabase.put(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.patch = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await nhanvienDatabase.patch(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.delete = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await nhanvienDatabase.delete(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.exists = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await nhanvienDatabase.exists(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
