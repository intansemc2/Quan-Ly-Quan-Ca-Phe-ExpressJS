const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `/*** 
File: api.router.js 
***/
`;
contents += `
//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
${
    datas.map(data => {
        //Pre-process
        let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
        let tablenameClass = ccfs.convertNameToJSClass(data.classname);
        let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

        let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
        let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

        return `
        const api${tablenameClass}Controller = require('../controllers/api/api.${tablenameFile}.controller');
        `;
    }).join('')
}

${
    datas.map(data => {
        //Pre-process
        let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
        let tablenameClass = ccfs.convertNameToJSClass(data.classname);
        let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

        let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
        let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

        return `
        //Routers for ${tablenameClass}  
        router.get('/${tablenameFile}', api${tablenameClass}Controller.get);  
        router.post('/${tablenameFile}', api${tablenameClass}Controller.post);  
        router.put('/${tablenameFile}', api${tablenameClass}Controller.put);  
        router.patch('/${tablenameFile}', api${tablenameClass}Controller.patch);  
        router.delete('/${tablenameFile}', api${tablenameClass}Controller.delete);  
        router.use('/${tablenameFile}/exists', api${tablenameClass}Controller.exists);  
        `;
    }).join('')
}


//Module export
module.exports = router;

`;

ccfs.writeStringSync(`${__dirname}/results/routers`, `api.router.js`, contents);
