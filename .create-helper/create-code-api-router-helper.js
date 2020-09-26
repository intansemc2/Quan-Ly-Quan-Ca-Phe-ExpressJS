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
        let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

        return `
        const api${tablenameRemoved}Controller = require('../controllers/api/api.${tablenameRemoved}.controller');
        `;
    }).join('')
}

${
    datas.map(data => {
        //Pre-process
        let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

        return `
        //Routers for ${tablenameRemoved}  
        router.get('/${tablenameRemoved}', api${tablenameRemoved}Controller.get);  
        router.post('/${tablenameRemoved}', api${tablenameRemoved}Controller.post);  
        router.put('/${tablenameRemoved}', api${tablenameRemoved}Controller.put);  
        router.patch('/${tablenameRemoved}', api${tablenameRemoved}Controller.patch);  
        router.delete('/${tablenameRemoved}', api${tablenameRemoved}Controller.delete);  
        router.use('/${tablenameRemoved}/exists', api${tablenameRemoved}Controller.exists);  
        `;
    }).join('')
}


//Module export
module.exports = router;

`;

ccfs.writeStringSync(`${__dirname}/results/routers`, `api.router.js`, contents);
