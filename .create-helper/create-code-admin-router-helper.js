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
        let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

        return `
//Router quanly${tablenameRemoved}
router.get('/quan-li-${tablenameRemoved}', adminController.quanly${tablenameRemoved});
`;
    }).join('\n') 
}

//Module export
module.exports = router;
`;

ccfs.writeStringSync(`${__dirname}/results/routers`, `admin.router.js`, contents);
