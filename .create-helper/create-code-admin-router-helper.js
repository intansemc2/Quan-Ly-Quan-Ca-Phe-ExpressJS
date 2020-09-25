const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

let contents = '';

//Create controller
contents += `/*** 
File: admin.router.js 
***/
`;
contents += `
//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const adminController = require('../controllers/admin.controller');

//Router main
router.get('/', adminController.tongquat);

//Router tongquat
router.get('/tong-quat', adminController.tongquat);

${
    datas.map(data => {
        //Pre-process
        let tablenameFile = ccfs.convertNameToJSClass(data.classname).toLowerCase();
        let tablenameClass = ccfs.convertNameToJSClass(data.classname);
        let tablenameObject = ccfs.convertNameToSqlProperty(data.classname);

        let tableNotKeysProperties = data.properties.filter((item) => !data.keys.find((key) => key === item.name));
        let tableKeysProperties = data.properties.filter((item) => data.keys.find((key) => key === item.name));

        return `
//Router quanly${tablenameFile}
router.get('/quan-ly-${tablenameFile}', adminController.quanly${tablenameFile});
`;
    }).join('\n') 
}

//Module export
module.exports = router;
`;

ccfs.writeStringSync(`${__dirname}/results/routers`, `admin.router.js`, contents);
