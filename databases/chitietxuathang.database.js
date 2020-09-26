/*** 
File: chitietxuathang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Chitietxuathang = require('../models/chitietxuathang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is object
if (typeof input === 'object') {
    //Input is Object
    
    if (input.maxuathang) {
        query += ` AND maXuatHang = ${mysql.escape(input.maxuathang)} `;
    }
            

    if (input.masanpham) {
        query += ` AND maSanPham = ${mysql.escape(input.masanpham)} `;
    }
            
    
    if (input.maxuathang || input.masanpham) {
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
        

    
    if (input.soluong) {
        query += ` AND soLuong = ${mysql.escape(input.soluong)} `;
    }
            

    if (input.dongia) {
        query += ` AND donGia = ${mysql.escape(input.dongia)} `;
    }
            
}
//Input is Array of Object
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) =>  ` ( maXuatHang = mysql.escape(item.maxuathang)} AND maSanPham = mysql.escape(item.masanpham)} ) `)
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

if (!input.maxuathang) {
input.maxuathang = null;
}
    

if (!input.masanpham) {
input.masanpham = null;
}
    

if (!input.soluong) {
input.soluong = null;
}
    

if (!input.dongia) {
input.dongia = null;
}
    
let query = `INSERT INTO chiTietXuatHang (maXuatHang,maSanPham,soLuong,donGia) VALUES ( ${mysql.escape(input.maxuathang)},${mysql.escape(input.masanpham)},${mysql.escape(input.soluong)},${mysql.escape(input.dongia)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE chiTietXuatHang SET `;
let queryChanges = [];


if (input.maxuathang) {
queryChanges.push(` AND maXuatHang = ${mysql.escape(input.maxuathang)} `);
}
        

if (input.masanpham) {
queryChanges.push(` AND maSanPham = ${mysql.escape(input.masanpham)} `);
}
        

if (input.soluong) {
queryChanges.push(` AND soLuong = ${mysql.escape(input.soluong)} `);
}
        

if (input.dongia) {
queryChanges.push(` AND donGia = ${mysql.escape(input.dongia)} `);
}
        


if (!input.oldMaxuathang) {
input.oldMaxuathang = input.maxuathang;
}
        

if (!input.oldMasanpham) {
input.oldMasanpham = input.masanpham;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maxuathang: input.oldMaxuathang,masanpham: input.oldMasanpham,soluong: input.oldSoluong,dongia: input.oldDongia});


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
query += module.exports.createWHEREPart({ maxuathang: input.maxuathang,masanpham: input.masanpham }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new Chitietxuathang();

output.maxuathang = input.maXuatHang;
    

output.masanpham = input.maSanPham;
    

output.soluong = input.soLuong;
    

output.dongia = input.donGia;
    
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
if (!input.maxuathang && !input.oldMaxuathang || !input.masanpham && !input.oldMasanpham) {
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

