/*** 
File: xuatHang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const xuatHang = require('../models/xuatHang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maXuatHang = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maXuatHang) {
        query += ` AND maXuatHang = ${mysql.escape(input.maXuatHang)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.ngayGioXuat) {
        query += ` AND ngayGioXuat = ${mysql.escape(input.ngayGioXuat)} `;
    }
            

    if (input.maNhanVien) {
        query += ` AND maNhanVien = ${mysql.escape(input.maNhanVien)} `;
    }
            

    if (input.maKhachHang) {
        query += ` AND maKhachHang = ${mysql.escape(input.maKhachHang)} `;
    }
            

    if (input.maBan) {
        query += ` AND maBan = ${mysql.escape(input.maBan)} `;
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
                return ` maXuatHang = ${mysql.escape(item)} `;
            }
            return ` maXuatHang = ${mysql.escape(item.maXuatHang)} `;
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
let query = 'SELECT * FROM xuatHang';
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryPost = function (input) {

if (!input.maXuatHang) {
input.maXuatHang = null;
}
    

if (!input.ngayGioXuat) {
input.ngayGioXuat = null;
}
    

if (!input.maNhanVien) {
input.maNhanVien = null;
}
    

if (!input.maKhachHang) {
input.maKhachHang = null;
}
    

if (!input.maBan) {
input.maBan = null;
}
    

if (!input.ghiChu) {
input.ghiChu = null;
}
    
let query = `INSERT INTO xuatHang (maXuatHang,ngayGioXuat,maNhanVien,maKhachHang,maBan,ghiChu) VALUES ( ${mysql.escape(input.maXuatHang)},${mysql.escape(input.ngayGioXuat)},${mysql.escape(input.maNhanVien)},${mysql.escape(input.maKhachHang)},${mysql.escape(input.maBan)},${mysql.escape(input.ghiChu)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE xuatHang SET `;
let queryChanges = [];


if (input.ngayGioXuat) {
queryChanges.push(` ngayGioXuat = ${mysql.escape(input.ngayGioXuat)} `);
}
        

if (input.maNhanVien) {
queryChanges.push(` maNhanVien = ${mysql.escape(input.maNhanVien)} `);
}
        

if (input.maKhachHang) {
queryChanges.push(` maKhachHang = ${mysql.escape(input.maKhachHang)} `);
}
        

if (input.maBan) {
queryChanges.push(` maBan = ${mysql.escape(input.maBan)} `);
}
        

if (input.ghiChu) {
queryChanges.push(` ghiChu = ${mysql.escape(input.ghiChu)} `);
}
        


if (!input.oldmaXuatHang) {
input.oldmaXuatHang = input.maXuatHang;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maXuatHang: input.oldmaXuatHang,ngayGioXuat: input.oldngayGioXuat,maNhanVien: input.oldmaNhanVien,maKhachHang: input.oldmaKhachHang,maBan: input.oldmaBan,ghiChu: input.oldghiChu});


return query;
};

module.exports.createQueryDelete = function (input) {
let query = `DELETE FROM xuatHang`;
query += module.exports.createWHEREPart(input, true);
return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM xuatHang `;

if (isPrimarykeyOnly) {
query += module.exports.createWHEREPart({ maXuatHang: input.maXuatHang }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new xuatHang();

output.maXuatHang = input.maXuatHang;
    

output.ngayGioXuat = input.ngayGioXuat;
    

output.maNhanVien = input.maNhanVien;
    

output.maKhachHang = input.maKhachHang;
    

output.maBan = input.maBan;
    

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
if (!input.maXuatHang && !input.oldmaXuatHang) {
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

