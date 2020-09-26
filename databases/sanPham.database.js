/*** 
File: sanPham.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const sanPham = require('../models/sanPham');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maSanPham = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maSanPham) {
        query += ` AND maSanPham = ${mysql.escape(input.maSanPham)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.ten) {
        query += ` AND ten = ${mysql.escape(input.ten)} `;
    }
            

    if (input.linkAnh) {
        query += ` AND linkAnh = ${mysql.escape(input.linkAnh)} `;
    }
            

    if (input.loai) {
        query += ` AND loai = ${mysql.escape(input.loai)} `;
    }
            

    if (input.gia) {
        query += ` AND gia = ${mysql.escape(input.gia)} `;
    }
            
}
//Input is Array
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return ` maSanPham = ${mysql.escape(item)} `;
            }
            return ` maSanPham = ${mysql.escape(item.maSanPham)} `;
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
let query = 'SELECT * FROM sanPham';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maSanPham) {
input.maSanPham = null;
}
    

if (!input.ten) {
input.ten = null;
}
    

if (!input.linkAnh) {
input.linkAnh = null;
}
    

if (!input.loai) {
input.loai = null;
}
    

if (!input.gia) {
input.gia = null;
}
    
let query = `INSERT INTO sanPham (maSanPham,ten,linkAnh,loai,gia) VALUES ( ${mysql.escape(input.maSanPham)},${mysql.escape(input.ten)},${mysql.escape(input.linkAnh)},${mysql.escape(input.loai)},${mysql.escape(input.gia)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE sanPham SET `;
let queryChanges = [];


if (input.ten) {
queryChanges.push(` ten = ${mysql.escape(input.ten)} `);
}
        

if (input.linkAnh) {
queryChanges.push(` linkAnh = ${mysql.escape(input.linkAnh)} `);
}
        

if (input.loai) {
queryChanges.push(` loai = ${mysql.escape(input.loai)} `);
}
        

if (input.gia) {
queryChanges.push(` gia = ${mysql.escape(input.gia)} `);
}
        


if (!input.oldmaSanPham) {
input.oldmaSanPham = input.maSanPham;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maSanPham: input.oldmaSanPham,ten: input.oldten,linkAnh: input.oldlinkAnh,loai: input.oldloai,gia: input.oldgia});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM sanPham`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM sanPham `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maSanPham: input.maSanPham }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new sanPham();

output.maSanPham = input.maSanPham;
    

output.ten = input.ten;
    

output.linkAnh = input.linkAnh;
    

output.loai = input.loai;
    

output.gia = input.gia;
    
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
if (!input.maSanPham && !input.oldmaSanPham) {
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

