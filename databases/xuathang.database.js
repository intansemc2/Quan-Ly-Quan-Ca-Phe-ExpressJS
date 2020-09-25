/*** 
File: xuathang.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Xuathang = require('../models/xuathang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
let query = "";
if (input) {

//Input is the id
if (typeof input === 'number' || typeof input === 'string') {
    query += ` AND maXuatHang = ${mysql.escape(input)} `;
}
//Input is object
else if (typeof input === 'object') {
    if (input.maxuathang) {
        query += ` AND maXuatHang = ${mysql.escape(input.maxuathang)} `;
        if (isPrimarykeyOnly) {
            return ` WHERE 1=1 ${query}`;
        }
    }
    
    if (input.ngaygioxuat) {
        query += ` AND ngayGioXuat = ${mysql.escape(input.ngaygioxuat)} `;
    }
            

    if (input.manhanvien) {
        query += ` AND maNhanVien = ${mysql.escape(input.manhanvien)} `;
    }
            

    if (input.makhachhang) {
        query += ` AND maKhachHang = ${mysql.escape(input.makhachhang)} `;
    }
            

    if (input.maban) {
        query += ` AND maBan = ${mysql.escape(input.maban)} `;
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
                return ` maXuatHang = ${mysql.escape(item)} `;
            }
            return ` maXuatHang = ${mysql.escape(item.maxuathang)} `;
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

if (!input.maxuathang) {
input.maxuathang = null;
}
    

if (!input.ngaygioxuat) {
input.ngaygioxuat = null;
}
    

if (!input.manhanvien) {
input.manhanvien = null;
}
    

if (!input.makhachhang) {
input.makhachhang = null;
}
    

if (!input.maban) {
input.maban = null;
}
    

if (!input.ghichu) {
input.ghichu = null;
}
    
let query = `INSERT INTO FROM xuatHang (maXuatHang,ngayGioXuat,maNhanVien,maKhachHang,maBan,ghiChu) VALUES ( ${mysql.escape(input.maxuathang)},${mysql.escape(input.ngaygioxuat)},${mysql.escape(input.manhanvien)},${mysql.escape(input.makhachhang)},${mysql.escape(input.maban)},${mysql.escape(input.ghichu)} )`;
return query;
};

module.exports.createQueryPatch = function (input) {
let query = `UPDATE FROM xuatHang SET `;
let queryChanges = [];


if (input.ngaygioxuat) {
queryChanges.push(` ngayGioXuat = ${mysql.escape(input.ngaygioxuat)} `);
}
        

if (input.manhanvien) {
queryChanges.push(` maNhanVien = ${mysql.escape(input.manhanvien)} `);
}
        

if (input.makhachhang) {
queryChanges.push(` maKhachHang = ${mysql.escape(input.makhachhang)} `);
}
        

if (input.maban) {
queryChanges.push(` maBan = ${mysql.escape(input.maban)} `);
}
        

if (input.ghichu) {
queryChanges.push(` ghiChu = ${mysql.escape(input.ghichu)} `);
}
        


if (!input.oldMaxuathang) {
input.oldMaxuathang = input.maxuathang;
}
        

query += queryChanges.join(',');
query += module.exports.createWHEREPart({maxuathang: input.oldMaxuathang,ngaygioxuat: input.oldNgaygioxuat,manhanvien: input.oldManhanvien,makhachhang: input.oldMakhachhang,maban: input.oldMaban,ghichu: input.oldGhichu});


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
query += module.exports.createWHEREPart({ maxuathang: input.maxuathang }, false, true);
} else {
query += module.exports.createWHEREPart(input, false, true);
}

return query;
};

module.exports.converResultGet = function (input) {
let output = new Xuathang();

output.maxuathang = input.maXuatHang;
    

output.ngaygioxuat = input.ngayGioXuat;
    

output.manhanvien = input.maNhanVien;
    

output.makhachhang = input.maKhachHang;
    

output.maban = input.maBan;
    

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
if (!input.maxuathang && !input.oldMaxuathang) {
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

