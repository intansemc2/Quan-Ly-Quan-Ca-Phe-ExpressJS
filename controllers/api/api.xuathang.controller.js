/*** 
File: api.xuathang.controller.js 
***/

    //Import Controllers
    const errorController = require('../error.controller');
    
    //Import Databases
    const xuathangDatabase = require('../../databases/xuathang.database');
    const xuathang = require('../../models/xuathang');
    
    module.exports.get = async function (request, response, next) {
        try {
            request.headers.accept = 'application/json';
            let input = request.body;
            let output = await xuathangDatabase.get(input);
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
            let output = await xuathangDatabase.post(input);
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
            let output = await xuathangDatabase.put(input);
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
            let output = await xuathangDatabase.patch(input);
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
            let output = await xuathangDatabase.delete(input);
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
            let output = await xuathangDatabase.exists(input);
            response.json(output);
            next();
        } catch (error) {
            errorController.handle500(error, request, response, next);
        }
    };    

