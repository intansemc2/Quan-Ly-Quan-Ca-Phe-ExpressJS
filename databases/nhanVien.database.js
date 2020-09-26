/*** 
File: nhanVien.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const nhanVien = require('../models/nhanVien');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maNhanVien = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maNhanVien) {
        query += ` AND maNhanVien = ${mysql.escape(input.maNhanVien)} `;
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
            

    if (input.diaChi) {
        query += ` AND diaChi = ${mysql.escape(input.diaChi)} `;
    }
            
}
//Input is Array
else if (typeof input === 'array' && input.length > 0) {
    query += ' AND (';
    query += input
        .map((item) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return ` maNhanVien = ${mysql.escape(item)} `;
            }
            return ` maNhanVien = ${mysql.escape(item.maNhanVien)} `;
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
let query = 'SELECT * FROM nhanVien';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maNhanVien) {
input.maNhanVien = null;
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
    

if (!input.diaChi) {
input.diaChi = null;
}
    
let query = `INSERT INTO nhanVien (maNhanVien,maTaiKhoan,ten,ngaySinh,soDienThoai,diaChi) VALUES ( ${mysql.escape(input.maNhanVien)},${mysql.escape(input.maTaiKhoan)},${mysql.escape(input.ten)},${mysql.escape(input.ngaySinh)},${mysql.escape(input.soDienThoai)},${mysql.escape(input.diaChi)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE nhanVien SET `;
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
        

if (input.diaChi) {
queryChanges.push(` diaChi = ${mysql.escape(input.diaChi)} `);
}
        


if (!input.oldmaNhanVien) {
input.oldmaNhanVien = input.maNhanVien;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maNhanVien: input.oldmaNhanVien,maTaiKhoan: input.oldmaTaiKhoan,ten: input.oldten,ngaySinh: input.oldngaySinh,soDienThoai: input.oldsoDienThoai,diaChi: input.olddiaChi});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM nhanVien`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM nhanVien `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maNhanVien: input.maNhanVien }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new nhanVien();

output.maNhanVien = input.maNhanVien;
    

output.maTaiKhoan = input.maTaiKhoan;
    

output.ten = input.ten;
    

output.ngaySinh = input.ngaySinh;
    

output.soDienThoai = input.soDienThoai;
    

output.diaChi = input.diaChi;
    
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
if (!input.maNhanVien && !input.oldmaNhanVien) {
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

