/*** 
File: sanpham.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Sanpham = require('../models/sanpham');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maSanPham = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.masanpham) {
        query += ` AND maSanPham = ${mysql.escape(input.masanpham)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.ten) {
        query += ` AND ten = ${mysql.escape(input.ten)} `;
    }
            

    if (input.linkanh) {
        query += ` AND linkAnh = ${mysql.escape(input.linkanh)} `;
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
            return ` maSanPham = ${mysql.escape(item.masanpham)} `;
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

if (!input.masanpham) {
input.masanpham = null;
}
    

if (!input.ten) {
input.ten = null;
}
    

if (!input.linkanh) {
input.linkanh = null;
}
    

if (!input.loai) {
input.loai = null;
}
    

if (!input.gia) {
input.gia = null;
}
    
let query = `INSERT INTO sanPham (maSanPham,ten,linkAnh,loai,gia) VALUES ( ${mysql.escape(input.masanpham)},${mysql.escape(input.ten)},${mysql.escape(input.linkanh)},${mysql.escape(input.loai)},${mysql.escape(input.gia)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE sanPham SET `;
let queryChanges = [];


if (input.ten) {
queryChanges.push(` ten = ${mysql.escape(input.ten)} `);
}
        

if (input.linkanh) {
queryChanges.push(` linkAnh = ${mysql.escape(input.linkanh)} `);
}
        

if (input.loai) {
queryChanges.push(` loai = ${mysql.escape(input.loai)} `);
}
        

if (input.gia) {
queryChanges.push(` gia = ${mysql.escape(input.gia)} `);
}
        


if (!input.oldMasanpham) {
input.oldMasanpham = input.masanpham;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({masanpham: input.oldMasanpham,ten: input.oldTen,linkanh: input.oldLinkanh,loai: input.oldLoai,gia: input.oldGia});


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
query += module.exports.createWHEREPart({ masanpham: input.masanpham }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new Sanpham();

output.masanpham = input.maSanPham;
    

output.ten = input.ten;
    

output.linkanh = input.linkAnh;
    

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
if (!input.masanpham && !input.oldMasanpham) {
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

