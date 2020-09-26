/*** 
File: taiKhoan.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const taiKhoan = require('../models/taiKhoan');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maTaiKhoan = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maTaiKhoan) {
        query += ` AND maTaiKhoan = ${mysql.escape(input.maTaiKhoan)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.tenDangNhap) {
        query += ` AND tenDangNhap = ${mysql.escape(input.tenDangNhap)} `;
    }
            

    if (input.matKhau) {
        query += ` AND matKhau = ${mysql.escape(input.matKhau)} `;
    }
            

    if (input.loai) {
        query += ` AND loai = ${mysql.escape(input.loai)} `;
    }
            
}
//Input is Array
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return ` maTaiKhoan = ${mysql.escape(item)} `;
            }
            return ` maTaiKhoan = ${mysql.escape(item.maTaiKhoan)} `;
        })
        .join(' OR ');
    query += ')';
}

}

if (query !== "" || (isAllowGetAll && query === '')) {
query = ` WHERE 1=1 ${query}`;
}
else {
query = " WHERE 1=0 "
}

return query;
};

module.exports.createQueryGet = function (input) {
let query = 'SELECT * FROM taiKhoan';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maTaiKhoan) {
input.maTaiKhoan = null;
}
    

if (!input.tenDangNhap) {
input.tenDangNhap = null;
}
    

if (!input.matKhau) {
input.matKhau = null;
}
    

if (!input.loai) {
input.loai = null;
}
    
let query = `INSERT INTO taiKhoan (maTaiKhoan,tenDangNhap,matKhau,loai) VALUES ( ${mysql.escape(input.maTaiKhoan)},${mysql.escape(input.tenDangNhap)},${mysql.escape(input.matKhau)},${mysql.escape(input.loai)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE taiKhoan SET `;
let queryChanges = [];


if (input.tenDangNhap) {
queryChanges.push(` tenDangNhap = ${mysql.escape(input.tenDangNhap)} `);
}
        

if (input.matKhau) {
queryChanges.push(` matKhau = ${mysql.escape(input.matKhau)} `);
}
        

if (input.loai) {
queryChanges.push(` loai = ${mysql.escape(input.loai)} `);
}
        


if (!input.oldmaTaiKhoan) {
input.oldmaTaiKhoan = input.maTaiKhoan;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maTaiKhoan: input.oldmaTaiKhoan,tenDangNhap: input.oldtenDangNhap,matKhau: input.oldmatKhau,loai: input.oldloai});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM taiKhoan`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM taiKhoan `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maTaiKhoan: input.maTaiKhoan }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new taiKhoan();

output.maTaiKhoan = input.maTaiKhoan;
    

output.tenDangNhap = input.tenDangNhap;
    

output.matKhau = input.matKhau;
    

output.loai = input.loai;
    
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
if (!input.maTaiKhoan && !input.oldmaTaiKhoan) {
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

