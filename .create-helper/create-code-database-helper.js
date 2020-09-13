const fs = require('fs');
const path = require('path');

function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
function capitalizeFirst(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
function lowercaseFirst(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}
function convertTableNameToSqlProperty(name) {
    return name.toLowerCase();
}
function convertNameToSqlProperty(name) {
    return name.toUpperCase();
}
function convertNameToJSClass(name) {
    return name
        .toLowerCase()
        .split('_')
        .map((item) => capitalizeFirst(item))
        .join('');
}
function convertNameToJSProperty(name) {
    return lowercaseFirst(
        name
            .toLowerCase()
            .split('_')
            .map((item) => capitalizeFirst(item))
            .join('')
    );
}
function copyTextareaToClipboard(textareaID) {
    let textArea = document.getElementById(textareaID);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        alert('Copying text command was ' + msg);
    } catch (err) {
        alert('Oops, unable to copy' + err);
    }
}

let datas = [
    {
        classname: 'ban',
        properties: [
            { name: 'ID_BAN', type: 'int', speak: 'id bàn' },
            { name: 'TEN', type: 'String', speak: 'tên bàn' },
            { name: 'GHI_CHU', type: 'int', speak: 'loại bàn' },
        ],
        keys: ['ID_BAN'],
    },
    {
        classname: 'cthd',
        properties: [
            { name: 'ID_HOA_DON', type: 'int', speak: 'id hóa đơn' },
            { name: 'ID_SAN_PHAM', type: 'int', speak: 'id sản phẩm' },
            { name: 'SO_LUONG', type: 'int', speak: 'số lượng' },
            { name: 'DON_GIA', type: 'int', speak: 'đơn giá' },
            { name: 'DIEM_TICH_LUY', type: 'int', speak: 'điểm tích lũy' },
        ],
        keys: ['ID_HOA_DON', 'ID_SAN_PHAM'],
    },
    {
        classname: 'ctkm',
        properties: [
            { name: 'ID_KHUYEN_MAI', type: 'int', speak: 'id khuyến mãi' },
            { name: 'ID_SAN_PHAM', type: 'int', speak: 'id sản phẩm' },
            { name: 'SO_LUONG', type: 'int', speak: 'số lượng' },
            { name: 'DON_GIA', type: 'int', speak: 'đơn giá' },
            { name: 'DIEM_TICH_LUY', type: 'int', speak: 'điểm tích lũy' },
        ],
        keys: ['ID_KHUYEN_MAI', 'ID_SAN_PHAM'],
    },
    {
        classname: 'dat_ban',
        properties: [
            { name: 'ID_KHACH_HANG', type: 'int', speak: 'id khách hàng ' },
            { name: 'ID_BAN', type: 'int', speak: 'id bàn' },
            { name: 'THOI_GIAN_LAP', type: 'datetime', speak: 'thời gian lập' },
            { name: 'THOI_GIAN_NHAN', type: 'datetime', speak: 'thời gian nhận' },
            { name: 'GHI_CHU', type: 'String', speak: 'ghi chú' },
        ],
        keys: ['username', 'ID_BAN', 'ID_KHACH_HANG', 'THOI_GIAN_LAP'],
    },
    {
        classname: 'hoa_don',
        properties: [
            { name: 'ID_HOA_DON', type: 'int', speak: 'id hóa đơn' },
            { name: 'ID_KHACH_HANG', type: 'int', speak: 'id khách hàng' },
            { name: 'ID_BAN', type: 'int', speak: 'id bàn' },
            { name: 'ID_NHAN_VIEN', type: 'int', speak: 'id nhân viên' },
            { name: 'THOI_GIAN_LAP', type: 'datetime', speak: 'thời gian' },
        ],
        keys: ['ID_HOA_DON'],
    },
    {
        classname: 'thanh_toan_hoa_don',
        properties: [
            { name: 'ID_HOA_DON', type: 'int', speak: 'id hóa đơn' },
            { name: 'ID_TAI_KHOAN_THANH_TOAN', type: 'int', speak: 'id tài khoản thanh toán' },
            { name: 'THOI_GIAN_THANH_TOAN', type: 'datetime', speak: 'thời gian thanh toán' },
            { name: 'PHAN_TRAM_TICH_LUY', type: 'float', speak: 'phần trăm tích lũy' },
            { name: 'SO_LUONG_DIEM_DOI', type: 'int', speak: 'số lượng điểm đổi' },
            { name: 'TY_GIA_DIEM_DOI', type: 'float', speak: 'tỷ giá quy đổi' },
        ],
        keys: ['ID_HOA_DON', 'ID_TAI_KHOAN_THANH_TOAN', 'THOI_GIAN_THANH_TOAN'],
    },
    {
        classname: 'khach_hang',
        properties: [
            { name: 'ID_KHACH_HANG', type: 'int', speak: 'id khách hàng' },
            { name: 'TEN', type: 'String', speak: 'tên' },
            { name: 'SDT', type: 'String', speak: 'số điện thoại' },
            { name: 'ID_TAI_KHOAN', type: 'int', speak: 'id tài khoản' },
            { name: 'DIEM_TICH_LUY', type: 'int', speak: 'điểm tích lũy' },
            { name: 'EMAIL', TYPE: 'text', speak: 'email' },
            { name: 'GOOGLE', TYPE: 'text', speak: 'google' },
            { name: 'FACEBOOK', TYPE: 'text', speak: 'facebook' },
        ],
        keys: ['ID_KHACH_HANG'],
    },
    {
        classname: 'khuyen_mai',
        properties: [
            { name: 'ID_KHUYEN_MAI', type: 'int', speak: 'id khuyến mãi' },
            { name: 'TEN', type: 'String', speak: 'tên' },
            { name: 'THOI_GIAN_DIEN_RA', type: 'datetime', speak: 'thời gian diễn ra' },
            { name: 'THOI_GIAN_KET_THUC', type: 'datetime', speak: 'thời gian kết thúc' },
        ],
        keys: ['ID_KHUYEN_MAI'],
    },
    {
        classname: 'loai_san_pham',
        properties: [
            { name: 'ID_LOAI_SAN_PHAM', type: 'int', speak: 'id loại sản phẩm' },
            { name: 'TEN', type: 'String', speak: 'tên' },
            { name: 'LINK_ANH', type: 'String', speak: 'link ảnh' },
            { name: 'GHI_CHU', type: 'String', speak: 'ghi chú' },
        ],
        keys: ['ID_LOAI_SAN_PHAM'],
    },
    {
        classname: 'nhan_vien',
        properties: [
            { name: 'ID_NHAN_VIEN', type: 'int', speak: 'id nhân viên' },
            { name: 'TEN', type: 'String', speak: 'tên' },
            { name: 'SDT', type: 'String', speak: 'số điện thoại' },
            { name: 'LOAI', type: 'int', speak: 'loại' },
            { name: 'ID_TAI_KHOAN', type: 'int', speak: 'id tài khoản' },
            { name: 'NGAY_SINH', type: 'date', speak: 'ngày sinh' },
            { name: 'LINK_ANH', type: 'text', speak: 'link ảnh' },
            { name: 'EMAIL', TYPE: 'text', speak: 'email' },
        ],
        keys: ['ID_NHAN_VIEN'],
    },
    {
        classname: 'san_pham',
        properties: [
            { name: 'ID_SAN_PHAM', type: 'int', speak: 'id sản phẩm' },
            { name: 'ID_LOAI_SAN_PHAM', type: 'int', speak: 'id loại sản phẩm' },
            { name: 'TEN', type: 'String', speak: 'tên' },
            { name: 'GIA', type: 'int', speak: 'giá' },
            { name: 'DIEM_TICH_LUY', type: 'int', speak: 'điểm tích lũy' },
            { name: 'GHI_CHU', type: 'String', speak: 'ghi chú' },
            { name: 'LINK_ANH', type: 'String', speak: 'link ảnh' },
        ],
        keys: ['ID_SAN_PHAM'],
    },
    {
        classname: 'tai_khoan',
        properties: [
            { name: 'ID_TAI_KHOAN', type: 'int', speak: 'id tài khoản' },
            { name: 'USERNAME', type: 'String', speak: 'tên đăng nhập' },
            { name: 'PASSWORD', type: 'String', speak: 'mật khẩu' },
            { name: 'LOAI', type: 'int', speak: 'loại' },
        ],
        keys: ['ID_TAI_KHOAN'],
    },
];

for (let i = 0; i < datas.length; i += 1) {
    let contents = '';
    let data = datas[i];

    //Pre-process
    let tablenameFile = convertNameToJSClass(data.classname).toLowerCase();
    let tablenameClass = convertNameToJSClass(data.classname);
    let tablenameObject = convertNameToSqlProperty(data.classname);

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
    if (input.${convertNameToJSProperty(data.keys[0])}) {
        query += \` AND ${data.keys[0]} = \${mysql.escape(input.${convertNameToJSProperty(data.keys[0])})} \`;
        if (isPrimarykeyOnly) {
            return \` WHERE 1=1 \${query}\`;
        }
    }
    ${tableNotKeysProperties
        .map(
            (item) => `
    if (input.${convertNameToJSProperty(item.name)}) {
        query += \` AND ${item.name} = \${mysql.escape(input.${convertNameToJSProperty(item.name)})} \`;
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
            return \` ${data.keys[0]} = \${mysql.escape(item.${convertNameToJSProperty(data.keys[0])})} \`;
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
    if (input.${convertNameToJSProperty(item.name)}) {
        query += \` AND ${item.name} = \${mysql.escape(input.${convertNameToJSProperty(item.name)})} \`;
    }
            `
        )
        .join('\n')}
    ${`
    if (${tableKeysProperties.map((item) => `input.${convertNameToJSProperty(item.name)}`).join(' || ')}) {
        if (isPrimarykeyOnly) {
            return \` WHERE 1=1 \${query}\`;
        }
    }
        `}

    ${tableNotKeysProperties
        .map(
            (item) => `
    if (input.${convertNameToJSProperty(item.name)}) {
        query += \` AND ${item.name} = \${mysql.escape(input.${convertNameToJSProperty(item.name)})} \`;
    }
            `
        )
        .join('\n')}
}
//Input is Array of Object
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) =>  \` ( ${tableKeysProperties.map((item) => `${item.name} = mysql.escape(item.${convertNameToJSProperty(item.name)})}`).join(' AND ')} ) \`)
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
if (!input.${convertNameToJSProperty(item.name)}) {
input.${convertNameToJSProperty(item.name)} = null;
}
    `
    )
    .join('\n')}
let query = \`INSERT INTO ${data.classname.toLowerCase()} (${data.properties.map((item) => item.name).join(',')}) VALUES ( ${data.properties.map((item) => `\${mysql.escape(input.${convertNameToJSProperty(item.name)})}`).join(',')} )\`;
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
if (input.${convertNameToJSProperty(item.name)}) {
queryChanges.push(\` ${item.name} = \${mysql.escape(input.${convertNameToJSProperty(item.name)})} \`);
}
        `
    )
    .join('\n')}

${tableKeysProperties
    .map(
        (item) => `
if (!input.old${convertNameToJSClass(item.name)}) {
input.old${convertNameToJSClass(item.name)} = input.${convertNameToJSProperty(item.name)};
}
        `
    )
    .join('\n')}

query += queryChanges.join(',');
query += module.exports.createWHEREPart({${data.properties.map((item) => `${convertNameToJSProperty(item.name)}: input.old${convertNameToJSClass(item.name)}`).join(',')}});
`
        : `
${data.properties
    .map(
        (item) => `
if (input.${convertNameToJSProperty(item.name)}) {
queryChanges.push(\` AND ${item.name} = \${mysql.escape(input.${convertNameToJSProperty(item.name)})} \`);
}
        `
    )
    .join('\n')}

${tableKeysProperties
    .map(
        (item) => `
if (!input.old${convertNameToJSClass(item.name)}) {
input.old${convertNameToJSClass(item.name)} = input.${convertNameToJSProperty(item.name)};
}
        `
    )
    .join('\n')}

query += queryChanges.join(',');
query += module.exports.createWHEREPart({${data.properties.map((item) => `${convertNameToJSProperty(item.name)}: input.old${convertNameToJSClass(item.name)}`).join(',')}});
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
query += module.exports.createWHEREPart({ ${tableKeysProperties.map((item) => `${convertNameToJSProperty(item.name)}: input.${convertNameToJSProperty(item.name)}`).join(',')} }, false, true);
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
output.${convertNameToJSProperty(item.name)} = input.${item.name};
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
if (${tableKeysProperties.map((item) => `!input.${convertNameToJSProperty(item.name)} && !input.old${convertNameToJSClass(item.name)}`).join(' || ')}) {
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

    //Create dir
    let dir = `${__dirname}/results`;
    //Check dir exists
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    //Write code to file
    fs.writeFileSync(`${dir}/${tablenameFile}.database.js`, contents, {encoding: 'utf8'});
}

