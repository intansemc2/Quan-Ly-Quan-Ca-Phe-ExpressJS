/*** 
File: nhapHang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const nhapHang = require('../models/nhapHang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maNhapHang = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maNhapHang) {
        query += ` AND maNhapHang = ${mysql.escape(input.maNhapHang)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.maNguonSanPham) {
        query += ` AND maNguonSanPham = ${mysql.escape(input.maNguonSanPham)} `;
    }
            

    if (input.ngayGioNhap) {
        query += ` AND ngayGioNhap = ${mysql.escape(input.ngayGioNhap)} `;
    }
            

    if (input.maNhanVien) {
        query += ` AND maNhanVien = ${mysql.escape(input.maNhanVien)} `;
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
                return ` maNhapHang = ${mysql.escape(item)} `;
            }
            return ` maNhapHang = ${mysql.escape(item.maNhapHang)} `;
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
let query = 'SELECT * FROM nhapHang';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maNhapHang) {
input.maNhapHang = null;
}
    

if (!input.maNguonSanPham) {
input.maNguonSanPham = null;
}
    

if (!input.ngayGioNhap) {
input.ngayGioNhap = null;
}
    

if (!input.maNhanVien) {
input.maNhanVien = null;
}
    

if (!input.ghiChu) {
input.ghiChu = null;
}
    
let query = `INSERT INTO nhapHang (maNhapHang,maNguonSanPham,ngayGioNhap,maNhanVien,ghiChu) VALUES ( ${mysql.escape(input.maNhapHang)},${mysql.escape(input.maNguonSanPham)},${mysql.escape(input.ngayGioNhap)},${mysql.escape(input.maNhanVien)},${mysql.escape(input.ghiChu)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE nhapHang SET `;
let queryChanges = [];


if (input.maNguonSanPham) {
queryChanges.push(` maNguonSanPham = ${mysql.escape(input.maNguonSanPham)} `);
}
        

if (input.ngayGioNhap) {
queryChanges.push(` ngayGioNhap = ${mysql.escape(input.ngayGioNhap)} `);
}
        

if (input.maNhanVien) {
queryChanges.push(` maNhanVien = ${mysql.escape(input.maNhanVien)} `);
}
        

if (input.ghiChu) {
queryChanges.push(` ghiChu = ${mysql.escape(input.ghiChu)} `);
}
        


if (!input.oldmaNhapHang) {
input.oldmaNhapHang = input.maNhapHang;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maNhapHang: input.oldmaNhapHang,maNguonSanPham: input.oldmaNguonSanPham,ngayGioNhap: input.oldngayGioNhap,maNhanVien: input.oldmaNhanVien,ghiChu: input.oldghiChu});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM nhapHang`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM nhapHang `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maNhapHang: input.maNhapHang }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new nhapHang();

output.maNhapHang = input.maNhapHang;
    

output.maNguonSanPham = input.maNguonSanPham;
    

output.ngayGioNhap = input.ngayGioNhap;
    

output.maNhanVien = input.maNhanVien;
    

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
if (!input.maNhapHang && !input.oldmaNhapHang) {
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

