/*** 
File: api.chitietxuathang.controller.js 
***/

    //Import Controllers
    const errorController = require('../error.controller');
    
    //Import Databases
    const chitietxuathangDatabase = require('../../databases/chitietxuathang.database');
    const Chitietxuathang = require('../../models/chitietxuathang');
    
    module.exports.get = async function (request, response, next) {
        try {
            request.headers.accept = 'application/json';
            let input = request.body;
            let output = await chitietxuathangDatabase.get(input);
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
            let output = await chitietxuathangDatabase.post(input);
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
            let output = await chitietxuathangDatabase.put(input);
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
            let output = await chitietxuathangDatabase.patch(input);
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
            let output = await chitietxuathangDatabase.delete(input);
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
            let output = await chitietxuathangDatabase.exists(input);
            response.json(output);
            next();
        } catch (error) {
            errorController.handle500(error, request, response, next);
        }
    };    

