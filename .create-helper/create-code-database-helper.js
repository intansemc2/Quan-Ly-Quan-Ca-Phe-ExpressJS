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

    //Create control textarea
    contents += `/*** 
File: ${tablenameFile}.database.js 
***/`;
    contents += `\n`;

    //Create content
    contents += `
//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const ${tablenameClass} = require('../models/${tablenameFile}');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {
${
    data.keys.length <= 1
        ? `
//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += \` AND ${data.keys[0]} = \${mysql.escape(input)} \`;
}
//Input is object
else if (typeof input === 'object') {
    if (input.${ccfs.convertNameToJSProperty(data.keys[0])}) {
        query += \` AND ${data.keys[0]} = \${mysql.escape(input.${ccfs.convertNameToJSProperty(data.keys[0])})} \`;
        if (isPrimarykeyOnly) {
            return \` WHERE 1=1 \${query}\`;
        }
    }
    ${tableNotKeysProperties
        .map(
            (item) => `
    if (input.${ccfs.convertNameToJSProperty(item.name)}) {
        query += \` AND ${item.name} = \${mysql.escape(input.${ccfs.convertNameToJSProperty(item.name)})} \`;
    }
            `
        )
        .join('\n')}
}
//Input is Array
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return \` ${data.keys[0]} = \${mysql.escape(item)} \`;
            }
            return \` ${data.keys[0]} = \${mysql.escape(item.${ccfs.convertNameToJSProperty(data.keys[0])})} \`;
        })
        .join(' OR ');
    query += ')';
}
`
        : `
//Input is object
if (typeof input === 'object') {
    //Input is Object
    ${tableKeysProperties
        .map(
            (item) => `
    if (input.${ccfs.convertNameToJSProperty(item.name)}) {
        query += \` AND ${item.name} = \${mysql.escape(input.${ccfs.convertNameToJSProperty(item.name)})} \`;
    }
            `
        )
        .join('\n')}
    ${`
    if (${tableKeysProperties.map((item) => `input.${ccfs.convertNameToJSProperty(item.name)}`).join(' || ')}) {
        if (isPrimarykeyOnly) {
            return \` WHERE 1=1 \${query}\`;
        }
    }
        `}

    ${tableNotKeysProperties
        .map(
            (item) => `
    if (input.${ccfs.convertNameToJSProperty(item.name)}) {
        query += \` AND ${item.name} = \${mysql.escape(input.${ccfs.convertNameToJSProperty(item.name)})} \`;
    }
            `
        )
        .join('\n')}
}
//Input is Array of Object
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) =>  \` ( ${tableKeysProperties.map((item) => `${item.name} = mysql.escape(item.${ccfs.convertNameToJSProperty(item.name)})}`).join(' AND ')} ) \`)
        .join(' OR ');
    query += ')';
}
`
}
}

if (query !== "" || (isAllowGetAll && query === '')) {
query = \` WHERE 1=1 \${query}\`;
}
else {
query = " WHERE 1=0 "
}

return query;
};

module.exports.createQueryGet = function (input) {
let query = 'SELECT * FROM ${data.classname.toLowerCase()}';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {
${data.properties
    .map(
        (item) => `
if (!input.${ccfs.convertNameToJSProperty(item.name)}) {
input.${ccfs.convertNameToJSProperty(item.name)} = null;
}
    `
    )
    .join('\n')}
let query = \`INSERT INTO ${data.classname.toLowerCase()} (${data.properties.map((item) => item.name).join(',')}) VALUES ( ${data.properties.map((item) => `\${mysql.escape(input.${ccfs.convertNameToJSProperty(item.name)})}`).join(',')} )\`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = \`UPDATE ${data.classname.toLowerCase()} SET \`;
let queryChanges = [];
${
    data.keys.length <= 1
        ? `
${tableNotKeysProperties
    .map(
        (item) => `
if (input.${ccfs.convertNameToJSProperty(item.name)}) {
queryChanges.push(\` ${item.name} = \${mysql.escape(input.${ccfs.convertNameToJSProperty(item.name)})} \`);
}
        `
    )
    .join('\n')}

${tableKeysProperties
    .map(
        (item) => `
if (!input.old${ccfs.convertNameToJSClass(item.name)}) {
input.old${ccfs.convertNameToJSClass(item.name)} = input.${ccfs.convertNameToJSProperty(item.name)};
}
        `
    )
    .join('\n')}

query += queryChanges.join(',');
query += module.exports.createWHEREPart({${data.properties.map((item) => `${ccfs.convertNameToJSProperty(item.name)}: input.old${ccfs.convertNameToJSClass(item.name)}`).join(',')}});
`
        : `
${data.properties
    .map(
        (item) => `
if (input.${ccfs.convertNameToJSProperty(item.name)}) {
queryChanges.push(\` AND ${item.name} = \${mysql.escape(input.${ccfs.convertNameToJSProperty(item.name)})} \`);
}
        `
    )
    .join('\n')}

${tableKeysProperties
    .map(
        (item) => `
if (!input.old${ccfs.convertNameToJSClass(item.name)}) {
input.old${ccfs.convertNameToJSClass(item.name)} = input.${ccfs.convertNameToJSProperty(item.name)};
}
        `
    )
    .join('\n')}

query += queryChanges.join(',');
query += module.exports.createWHEREPart({${data.properties.map((item) => `${ccfs.convertNameToJSProperty(item.name)}: input.old${ccfs.convertNameToJSClass(item.name)}`).join(',')}});
`
}

return query;
};

module.exports.createQueryDelete = function (input) {
let query = \`DELETE FROM ${data.classname.toLowerCase()}\`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = \`SELECT COUNT(*) AS NUMBER_ROWS FROM ${data.classname.toLowerCase()} \`;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ ${tableKeysProperties.map((item) => `${ccfs.convertNameToJSProperty(item.name)}: input.${ccfs.convertNameToJSProperty(item.name)}`).join(',')} }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new ${tablenameClass}();
${data.properties
    .map(
        (item) => `
output.${ccfs.convertNameToJSProperty(item.name)} = input.${item.name};
    `
    )
    .join('\n')}
return output;
};

module.exports.get = function (input) {
return baseDatabase.get(input, module.exports.createQueryGet, module.exports.converResultGet);
};

module.exports.post = function (input) {
if (!input) {
throw new Error("Missing the input");
}
return baseDatabase.post(input, module.exports.createQueryPost);
};

module.exports.put = function (input) {
return baseDatabase.put(input, module.exports.createQueryExists, module.exports.createQueryPatch, module.exports.createQueryPost);
};

module.exports.patch = function (input) {
if (!input) {
throw new Error("Missing the input");
}
if (${tableKeysProperties.map((item) => `!input.${ccfs.convertNameToJSProperty(item.name)} && !input.old${ccfs.convertNameToJSClass(item.name)}`).join(' || ')}) {
throw new Error("Missing the identity properties");
}
return baseDatabase.patch(input, module.exports.createQueryPatch);
};

module.exports.delete = function (input) {
return baseDatabase.delete(input, module.exports.createQueryDelete);
};

module.exports.exists = function (input) {
return baseDatabase.exists(input, module.exports.createQueryExists);
};

`;

    //Write code to file
    ccfs.writeStringSync(`${__dirname}/results`, `${tablenameFile}.database.js`, contents);
}
