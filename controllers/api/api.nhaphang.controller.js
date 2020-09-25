/*** 
File: api.nhaphang.controller.js 
***/

    //Import Controllers
    const errorController = require('../error.controller');
    
    //Import Databases
    const nhaphangDatabase = require('../../databases/nhaphang.database');
    const Nhaphang = require('../../models/nhaphang');
    
    module.exports.get = async function (request, response, next) {
        try {
            request.headers.accept = 'application/json';
            let input = request.body;
            let output = await nhaphangDatabase.get(input);
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
            let output = await nhaphangDatabase.post(input);
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
            let output = await nhaphangDatabase.put(input);
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
            let output = await nhaphangDatabase.patch(input);
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
            let output = await nhaphangDatabase.delete(input);
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
            let output = await nhaphangDatabase.exists(input);
            response.json(output);
            next();
        } catch (error) {
            errorController.handle500(error, request, response, next);
        }
    };    

