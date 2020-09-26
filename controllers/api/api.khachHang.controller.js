/*** 
File: api.khachHang.controller.js 
***/

    //Import Controllers
    const errorController = require('../error.controller');
    
    //Import Databases
    const khachHangDatabase = require('../../databases/khachHang.database');
    const khachHang = require('../../models/khachHang');
    
    module.exports.get = async function (request, response, next) {
        try {
            request.headers.accept = 'application/json';
            let input = request.body;
            let output = await khachHangDatabase.get(input);
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
            let output = await khachHangDatabase.post(input);
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
            let output = await khachHangDatabase.put(input);
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
            let output = await khachHangDatabase.patch(input);
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
            let output = await khachHangDatabase.delete(input);
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
            let output = await khachHangDatabase.exists(input);
            response.json(output);
            next();
        } catch (error) {
            errorController.handle500(error, request, response, next);
        }
    };    

