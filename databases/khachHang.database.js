/*** 
File: khachHang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const khachHang = require('../models/khachHang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maKhachHang = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maKhachHang) {
        query += ` AND maKhachHang = ${mysql.escape(input.maKhachHang)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.maTaiKhoan) {
        query += ` AND maTaiKhoan = ${mysql.escape(input.maTaiKhoan)} `;
    }
            

    if (input.ten) {
        query += ` AND ten = ${mysql.escape(input.ten)} `;
    }
            

    if (input.ngaySinh) {
        query += ` AND ngaySinh = ${mysql.escape(input.ngaySinh)} `;
    }
            

    if (input.soDienThoai) {
        query += ` AND soDienThoai = ${mysql.escape(input.soDienThoai)} `;
    }
            

    if (input.ghiChu) {
        query += ` AND ghiChu = ${mysql.escape(input.ghiChu)} `;
    }
            
}
//Input is Array
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return ` maKhachHang = ${mysql.escape(item)} `;
            }
            return ` maKhachHang = ${mysql.escape(item.maKhachHang)} `;
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
let query = 'SELECT * FROM khachHang';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maKhachHang) {
input.maKhachHang = null;
}
    

if (!input.maTaiKhoan) {
input.maTaiKhoan = null;
}
    

if (!input.ten) {
input.ten = null;
}
    

if (!input.ngaySinh) {
input.ngaySinh = null;
}
    

if (!input.soDienThoai) {
input.soDienThoai = null;
}
    

if (!input.ghiChu) {
input.ghiChu = null;
}
    
let query = `INSERT INTO khachHang (maKhachHang,maTaiKhoan,ten,ngaySinh,soDienThoai,ghiChu) VALUES ( ${mysql.escape(input.maKhachHang)},${mysql.escape(input.maTaiKhoan)},${mysql.escape(input.ten)},${mysql.escape(input.ngaySinh)},${mysql.escape(input.soDienThoai)},${mysql.escape(input.ghiChu)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE khachHang SET `;
let queryChanges = [];


if (input.maTaiKhoan) {
queryChanges.push(` maTaiKhoan = ${mysql.escape(input.maTaiKhoan)} `);
}
        

if (input.ten) {
queryChanges.push(` ten = ${mysql.escape(input.ten)} `);
}
        

if (input.ngaySinh) {
queryChanges.push(` ngaySinh = ${mysql.escape(input.ngaySinh)} `);
}
        

if (input.soDienThoai) {
queryChanges.push(` soDienThoai = ${mysql.escape(input.soDienThoai)} `);
}
        

if (input.ghiChu) {
queryChanges.push(` ghiChu = ${mysql.escape(input.ghiChu)} `);
}
        


if (!input.oldmaKhachHang) {
input.oldmaKhachHang = input.maKhachHang;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maKhachHang: input.oldmaKhachHang,maTaiKhoan: input.oldmaTaiKhoan,ten: input.oldten,ngaySinh: input.oldngaySinh,soDienThoai: input.oldsoDienThoai,ghiChu: input.oldghiChu});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM khachHang`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM khachHang `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maKhachHang: input.maKhachHang }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new khachHang();

output.maKhachHang = input.maKhachHang;
    

output.maTaiKhoan = input.maTaiKhoan;
    

output.ten = input.ten;
    

output.ngaySinh = input.ngaySinh;
    

output.soDienThoai = input.soDienThoai;
    

output.ghiChu = input.ghiChu;
    
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
if (!input.maKhachHang && !input.oldmaKhachHang) {
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

