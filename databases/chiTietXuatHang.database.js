/*** 
File: chiTietXuatHang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const chiTietXuatHang = require('../models/chiTietXuatHang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is object
if (typeof input === 'object') {
    //Input is Object
    
    if (input.maXuatHang) {
        query += ` AND maXuatHang = ${mysql.escape(input.maXuatHang)} `;
    }
            

    if (input.maSanPham) {
        query += ` AND maSanPham = ${mysql.escape(input.maSanPham)} `;
    }
            
    
    if (input.maXuatHang || input.maSanPham) {
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
        

    
    if (input.soLuong) {
        query += ` AND soLuong = ${mysql.escape(input.soLuong)} `;
    }
            

    if (input.donGia) {
        query += ` AND donGia = ${mysql.escape(input.donGia)} `;
    }
            
}
//Input is Array of Object
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) =>  ` ( maXuatHang = mysql.escape(item.maXuatHang)} AND maSanPham = mysql.escape(item.maSanPham)} ) `)
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
let query = 'SELECT * FROM chiTietXuatHang';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maXuatHang) {
input.maXuatHang = null;
}
    

if (!input.maSanPham) {
input.maSanPham = null;
}
    

if (!input.soLuong) {
input.soLuong = null;
}
    

if (!input.donGia) {
input.donGia = null;
}
    
let query = `INSERT INTO chiTietXuatHang (maXuatHang,maSanPham,soLuong,donGia) VALUES ( ${mysql.escape(input.maXuatHang)},${mysql.escape(input.maSanPham)},${mysql.escape(input.soLuong)},${mysql.escape(input.donGia)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE chiTietXuatHang SET `;
let queryChanges = [];


if (input.maXuatHang) {
queryChanges.push(` maXuatHang = ${mysql.escape(input.maXuatHang)} `);
}
        

if (input.maSanPham) {
queryChanges.push(` maSanPham = ${mysql.escape(input.maSanPham)} `);
}
        

if (input.soLuong) {
queryChanges.push(` soLuong = ${mysql.escape(input.soLuong)} `);
}
        

if (input.donGia) {
queryChanges.push(` donGia = ${mysql.escape(input.donGia)} `);
}
        


if (!input.oldmaXuatHang) {
input.oldmaXuatHang = input.maXuatHang;
}
        

if (!input.oldmaSanPham) {
input.oldmaSanPham = input.maSanPham;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maXuatHang: input.oldmaXuatHang,maSanPham: input.oldmaSanPham,soLuong: input.oldsoLuong,donGia: input.olddonGia});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM chiTietXuatHang`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM chiTietXuatHang `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maXuatHang: input.maXuatHang,maSanPham: input.maSanPham }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new chiTietXuatHang();

output.maXuatHang = input.maXuatHang;
    

output.maSanPham = input.maSanPham;
    

output.soLuong = input.soLuong;
    

output.donGia = input.donGia;
    
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
if (!input.maXuatHang && !input.oldmaXuatHang || !input.maSanPham && !input.oldmaSanPham) {
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

