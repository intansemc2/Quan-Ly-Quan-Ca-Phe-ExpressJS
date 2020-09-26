const fs = require('fs');
const path = require('path');

const tableData = require('./tableData');
const ccfs = require('./createCodeFunctions');

let datas = tableData.tableData;

for (let i = 0; i < datas.length; i += 1) {
    let contents = '';
    let data = datas[i];

    //Pre-process
    let tablenameRemoved = ccfs.removeNCharLowercase(data.classname);

    //Create controller
    contents += `/*** 
File: ${tablenameRemoved}.js 
***/
`;
    contents += `
class ${tablenameRemoved} {
    constructor(${data.properties.map(item =>  `${ccfs.removeNCharLowercase(item.name)} = null`).join(', ')}) {
${data.properties.map(item =>  `this.${ccfs.removeNCharLowercase(item.name)} = ${ccfs.removeNCharLowercase(item.name)};`).join('\n')}
    }
}

module.exports = ${tablenameRemoved};
`;
    ccfs.writeStringSync(`${__dirname}/results/models`, `${tablenameRemoved}.js`, contents);
}
