//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Ctkm = require('../models/ctkm');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = ` WHERE 1=1 `;
    if (input) {
        //Input is object
        if (typeof input === 'object') {
            //Input is Object

            if (input.idKhuyenMai) {
                query += ` AND ID_KHUYEN_MAI = ${mysql.escape(input.idKhuyenMai)} `;
            }

            if (input.idSanPham) {
                query += ` AND ID_SAN_PHAM = ${mysql.escape(input.idSanPham)} `;
            }

            if (input.idSanPham) {
                if (isPrimarykeyOnly) {
                    return query;
                }
            }

            if (input.soLuong) {
                query += ` AND SO_LUONG = ${mysql.escape(input.soLuong)} `;
            }

            if (input.donGia) {
                query += ` AND DON_GIA = ${mysql.escape(input.donGia)} `;
            }

            if (input.diemTichLuy) {
                query += ` AND DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `;
            }
        }
        //Input is Array of Object
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input.map((item) => ` ( ID_KHUYEN_MAI = mysql.escape(item.idKhuyenMai)} AND ID_SAN_PHAM = mysql.escape(item.idSanPham)} ) `).join(' OR ');
            query += ')';
        }
    }
    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM ctkm';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    let query = `INSERT INTO ctkm (ID_KHUYEN_MAI,ID_SAN_PHAM,SO_LUONG,DON_GIA,DIEM_TICH_LUY) VALUES ( ${mysql.escape(input.idKhuyenMai)},${mysql.escape(input.idSanPham)},${mysql.escape(input.soLuong)},${mysql.escape(input.donGia)},${mysql.escape(input.diemTichLuy)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE ctkm SET `;
    let queryChanges = [];

    if (input.idKhuyenMai) {
        queryChanges.push(` AND ID_KHUYEN_MAI = ${mysql.escape(input.idKhuyenMai)} `);
    }

    if (input.idSanPham) {
        queryChanges.push(` AND ID_SAN_PHAM = ${mysql.escape(input.idSanPham)} `);
    }

    if (input.soLuong) {
        queryChanges.push(` AND SO_LUONG = ${mysql.escape(input.soLuong)} `);
    }

    if (input.donGia) {
        queryChanges.push(` AND DON_GIA = ${mysql.escape(input.donGia)} `);
    }

    if (input.diemTichLuy) {
        queryChanges.push(` AND DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `);
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idKhuyenMai: input.idKhuyenMai, idSanPham: input.idSanPham });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM ctkm`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM ctkm `;

    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.converResultGet = function (input) {
    let output = new Ctkm();

    output.idKhuyenMai = input.ID_KHUYEN_MAI;

    output.idSanPham = input.ID_SAN_PHAM;

    output.soLuong = input.SO_LUONG;

    output.donGia = input.DON_GIA;

    output.diemTichLuy = input.DIEM_TICH_LUY;

    return output;
};

module.exports.get = function (input) {
    return baseDatabase.get(input, module.exports.createQueryGet, module.exports.converResultGet);
};

module.exports.post = function (input) {
    return baseDatabase.post(input, module.exports.createQueryPost);
};

module.exports.put = function (input) {
    return baseDatabase.put(input, module.exports.createQueryExists, module.exports.createQueryPatch, module.exports.createQueryPost);
};

module.exports.patch = function (input) {
    return baseDatabase.patch(input, module.exports.createQueryPatch);
};

module.exports.delete = function (input) {
    return baseDatabase.delete(input, module.exports.createQueryDelete);
};

module.exports.exists = function (input) {
    return baseDatabase.exists(input, module.exports.createQueryExists);
};
