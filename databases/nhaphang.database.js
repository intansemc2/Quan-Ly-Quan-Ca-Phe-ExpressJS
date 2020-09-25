/*** 
File: nhaphang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Nhaphang = require('../models/nhaphang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maNhapHang = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.manhaphang) {
        query += ` AND maNhapHang = ${mysql.escape(input.manhaphang)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.manguonsanpham) {
        query += ` AND maNguonSanPham = ${mysql.escape(input.manguonsanpham)} `;
    }
            

    if (input.ngaygionhap) {
        query += ` AND ngayGioNhap = ${mysql.escape(input.ngaygionhap)} `;
    }
            

    if (input.manhanvien) {
        query += ` AND maNhanVien = ${mysql.escape(input.manhanvien)} `;
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
                return ` maNhapHang = ${mysql.escape(item)} `;
            }
            return ` maNhapHang = ${mysql.escape(item.manhaphang)} `;
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

if (!input.manhaphang) {
input.manhaphang = null;
}
    

if (!input.manguonsanpham) {
input.manguonsanpham = null;
}
    

if (!input.ngaygionhap) {
input.ngaygionhap = null;
}
    

if (!input.manhanvien) {
input.manhanvien = null;
}
    

if (!input.ghichu) {
input.ghichu = null;
}
    
let query = `INSERT INTO FROM nhapHang (maNhapHang,maNguonSanPham,ngayGioNhap,maNhanVien,ghiChu) VALUES ( ${mysql.escape(input.manhaphang)},${mysql.escape(input.manguonsanpham)},${mysql.escape(input.ngaygionhap)},${mysql.escape(input.manhanvien)},${mysql.escape(input.ghichu)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE FROM nhapHang SET `;
let queryChanges = [];


if (input.manguonsanpham) {
queryChanges.push(` maNguonSanPham = ${mysql.escape(input.manguonsanpham)} `);
}
        

if (input.ngaygionhap) {
queryChanges.push(` ngayGioNhap = ${mysql.escape(input.ngaygionhap)} `);
}
        

if (input.manhanvien) {
queryChanges.push(` maNhanVien = ${mysql.escape(input.manhanvien)} `);
}
        

if (input.ghichu) {
queryChanges.push(` ghiChu = ${mysql.escape(input.ghichu)} `);
}
        


if (!input.oldManhaphang) {
input.oldManhaphang = input.manhaphang;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({manhaphang: input.oldManhaphang,manguonsanpham: input.oldManguonsanpham,ngaygionhap: input.oldNgaygionhap,manhanvien: input.oldManhanvien,ghichu: input.oldGhichu});


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
query += module.exports.createWHEREPart({ manhaphang: input.manhaphang }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new Nhaphang();

output.manhaphang = input.maNhapHang;
    

output.manguonsanpham = input.maNguonSanPham;
    

output.ngaygionhap = input.ngayGioNhap;
    

output.manhanvien = input.maNhanVien;
    

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
if (!input.manhaphang && !input.oldManhaphang) {
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

