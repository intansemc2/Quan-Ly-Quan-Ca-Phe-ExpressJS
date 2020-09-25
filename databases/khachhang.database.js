/*** 
File: khachhang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Khachhang = require('../models/khachhang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maKhachHang = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.makhachhang) {
        query += ` AND maKhachHang = ${mysql.escape(input.makhachhang)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.mataikhoan) {
        query += ` AND maTaiKhoan = ${mysql.escape(input.mataikhoan)} `;
    }
            

    if (input.ten) {
        query += ` AND ten = ${mysql.escape(input.ten)} `;
    }
            

    if (input.ngaysinh) {
        query += ` AND ngaySinh = ${mysql.escape(input.ngaysinh)} `;
    }
            

    if (input.sodienthoai) {
        query += ` AND soDienThoai = ${mysql.escape(input.sodienthoai)} `;
    }
            

    if (input.ghichu) {
        query += ` AND ghiChu = ${mysql.escape(input.ghichu)} `;
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
            return ` maKhachHang = ${mysql.escape(item.makhachhang)} `;
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

if (!input.makhachhang) {
input.makhachhang = null;
}
    

if (!input.mataikhoan) {
input.mataikhoan = null;
}
    

if (!input.ten) {
input.ten = null;
}
    

if (!input.ngaysinh) {
input.ngaysinh = null;
}
    

if (!input.sodienthoai) {
input.sodienthoai = null;
}
    

if (!input.ghichu) {
input.ghichu = null;
}
    
let query = `INSERT INTO FROM khachHang (maKhachHang,maTaiKhoan,ten,ngaySinh,soDienThoai,ghiChu) VALUES ( ${mysql.escape(input.makhachhang)},${mysql.escape(input.mataikhoan)},${mysql.escape(input.ten)},${mysql.escape(input.ngaysinh)},${mysql.escape(input.sodienthoai)},${mysql.escape(input.ghichu)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE FROM khachHang SET `;
let queryChanges = [];


if (input.mataikhoan) {
queryChanges.push(` maTaiKhoan = ${mysql.escape(input.mataikhoan)} `);
}
        

if (input.ten) {
queryChanges.push(` ten = ${mysql.escape(input.ten)} `);
}
        

if (input.ngaysinh) {
queryChanges.push(` ngaySinh = ${mysql.escape(input.ngaysinh)} `);
}
        

if (input.sodienthoai) {
queryChanges.push(` soDienThoai = ${mysql.escape(input.sodienthoai)} `);
}
        

if (input.ghichu) {
queryChanges.push(` ghiChu = ${mysql.escape(input.ghichu)} `);
}
        


if (!input.oldMakhachhang) {
input.oldMakhachhang = input.makhachhang;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({makhachhang: input.oldMakhachhang,mataikhoan: input.oldMataikhoan,ten: input.oldTen,ngaysinh: input.oldNgaysinh,sodienthoai: input.oldSodienthoai,ghichu: input.oldGhichu});


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
query += module.exports.createWHEREPart({ makhachhang: input.makhachhang }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new Khachhang();

output.makhachhang = input.maKhachHang;
    

output.mataikhoan = input.maTaiKhoan;
    

output.ten = input.ten;
    

output.ngaysinh = input.ngaySinh;
    

output.sodienthoai = input.soDienThoai;
    

output.ghichu = input.ghiChu;
    
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
if (!input.makhachhang && !input.oldMakhachhang) {
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

