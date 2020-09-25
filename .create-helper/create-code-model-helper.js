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
File: ${tablenameFile}.js 
***/
`;
    contents += `
class ${tablenameClass} {
    constructor(${data.properties.map(item =>  `${item.name} = null`).join(', ')}) {
${data.properties.map(item =>  `this.${item.name} = ${item.name};`).join('\n')}
    }
}

module.exports = ${tablenameClass};
`;
    ccfs.writeStringSync(`${__dirname}/results/models`, `${tablenameFile}.js`, contents);
}
