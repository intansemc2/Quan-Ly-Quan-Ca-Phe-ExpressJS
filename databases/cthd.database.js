//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Cthd = require('../models/cthd');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is object
        if (typeof input === 'object') {
            //Input is Object

            if (input.idHoaDon) {
                query += ` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `;
            }

            if (input.idSanPham) {
                query += ` AND ID_SAN_PHAM = ${mysql.escape(input.idSanPham)} `;
            }

            if (input.idHoaDon || input.idSanPham) {
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
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
            query += input.map((item) => ` ( ID_HOA_DON = mysql.escape(item.idHoaDon)} AND ID_SAN_PHAM = mysql.escape(item.idSanPham)} ) `).join(' OR ');
            query += ')';
        }
    }

    if (query !== '') {
        query = ` WHERE 1=1 ${query}`;
    } else {
        query = ' WHERE 1=0 ';
    }

    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM cthd';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idHoaDon) {
        input.idHoaDon = null;
    }

    if (!input.idSanPham) {
        input.idSanPham = null;
    }

    if (!input.soLuong) {
        input.soLuong = null;
    }

    if (!input.donGia) {
        input.donGia = null;
    }

    if (!input.diemTichLuy) {
        input.diemTichLuy = null;
    }

    let query = `INSERT INTO cthd (ID_HOA_DON,ID_SAN_PHAM,SO_LUONG,DON_GIA,DIEM_TICH_LUY) VALUES ( ${mysql.escape(input.idHoaDon)},${mysql.escape(input.idSanPham)},${mysql.escape(input.soLuong)},${mysql.escape(input.donGia)},${mysql.escape(input.diemTichLuy)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE cthd SET `;
    let queryChanges = [];

    if (input.idHoaDon) {
        queryChanges.push(` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `);
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

    if (!input.oldIdHoaDon) {
        input.oldIdHoaDon = input.idHoaDon;
    }

    if (!input.oldIdSanPham) {
        input.oldIdSanPham = input.idSanPham;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idHoaDon: input.oldIdHoaDon, idSanPham: input.oldIdSanPham, soLuong: input.oldSoLuong, donGia: input.oldDonGia, diemTichLuy: input.oldDiemTichLuy });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM cthd`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM cthd `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idHoaDon: input.idHoaDon, idSanPham: input.idSanPham }, true);
    } else {
        query += module.exports.createWHEREPart(input, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new Cthd();

    output.idHoaDon = input.ID_HOA_DON;

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
    if (!input) {
        throw new Error('Missing the input');
    }
    return baseDatabase.post(input, module.exports.createQueryPost);
};

module.exports.put = function (input) {
    return baseDatabase.put(input, module.exports.createQueryExists, module.exports.createQueryPatch, module.exports.createQueryPost);
};

module.exports.patch = function (input) {
    if (!input) {
        throw new Error('Missing the input');
    }
    if ((!input.idHoaDon && !input.oldIdHoaDon) || (!input.idSanPham && !input.oldIdSanPham)) {
        throw new Error('Missing the identity properties');
    }
    return baseDatabase.patch(input, module.exports.createQueryPatch);
};

module.exports.delete = function (input) {
    return baseDatabase.delete(input, module.exports.createQueryDelete);
};

module.exports.exists = function (input) {
    return baseDatabase.exists(input, module.exports.createQueryExists);
};
