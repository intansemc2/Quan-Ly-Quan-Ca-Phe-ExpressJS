//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const hoadonDatabase = require('../../databases/hoadon.database');

module.exports.get = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await hoadonDatabase.get(input);
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
        let output = await hoadonDatabase.post(input);
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
        let output = await hoadonDatabase.put(input);
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
        let output = await hoadonDatabase.patch(input);
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
        let output = await hoadonDatabase.delete(input);
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
        let output = await hoadonDatabase.exists(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
