const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

for (let i = 0; i < datas.length; i += 1) {
    let contents = '';
    let data = datas[i];

    //Pre-process
    let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
    let tablenameClass = ccfs.convertNameToJSClass(data.classname);
    let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

    let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
    let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

    //Create controller
    contents += `/*** 
File: api.${tablenameFile}.controller.js 
***/`;
    contents += `\n`;
    contents += `

    //Import Controllers
    const errorController = require('../error.controller');
    
    //Import Databases
    const ${tablenameFile}Database = require('../../databases/${tablenameFile}.database');
    const ${tablenameClass} = require('../../models/${tablenameFile}');
    
    module.exports.get = async function (request, response, next) {
        try {
            request.headers.accept = 'application/json';
            let input = request.body;
            let output = await ${tablenameFile}Database.get(input);
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
            let output = await ${tablenameFile}Database.post(input);
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
            let output = await ${tablenameFile}Database.put(input);
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
            let output = await ${tablenameFile}Database.patch(input);
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
            let output = await ${tablenameFile}Database.delete(input);
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
            let output = await ${tablenameFile}Database.exists(input);
            response.json(output);
            next();
        } catch (error) {
            errorController.handle500(error, request, response, next);
        }
    };    

`;
    ccfs.writeStringSync(`${__dirname}/results/controllers/api`, `api.${tablenameFile}.controller.js`, contents);
}
