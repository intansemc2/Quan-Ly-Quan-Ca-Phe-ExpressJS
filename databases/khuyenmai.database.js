//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const KhuyenMai = require('../models/khuyenmai');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = ` WHERE 1=1 `;
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_KHUYEN_MAI = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object' && input.constructor === KhuyenMai) {
            if (input.idKhuyenMai) {
                query += ` AND ID_KHUYEN_MAI = ${mysql.escape(input.idKhuyenMai)} `;
                if (isPrimarykeyOnly) {
                    return query;
                }
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.thoiGianDienRa) {
                query += ` AND THOI_GIAN_DIEN_RA = ${mysql.escape(input.thoiGianDienRa)} `;
            }

            if (input.thoiGianKetThuc) {
                query += ` AND THOI_GIAN_KET_THUC = ${mysql.escape(input.thoiGianKetThuc)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_KHUYEN_MAI = ${mysql.escape(item)} `;
                    }
                    return ` ID_KHUYEN_MAI = ${mysql.escape(item.idKhuyenMai)} `;
                })
                .join(' OR ');
            query += ')';
        }
    }
    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM khuyen_mai';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    let query = `INSERT INTO khuyen_mai (ID_KHUYEN_MAI,TEN,THOI_GIAN_DIEN_RA,THOI_GIAN_KET_THUC) VALUES ( ${mysql.escape(input.idKhuyenMai)},${mysql.escape(input.ten)},${mysql.escape(input.thoiGianDienRa)},${mysql.escape(input.thoiGianKetThuc)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE khuyen_mai SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.thoiGianDienRa) {
        queryChanges.push(` THOI_GIAN_DIEN_RA = ${mysql.escape(input.thoiGianDienRa)} `);
    }

    if (input.thoiGianKetThuc) {
        queryChanges.push(` THOI_GIAN_KET_THUC = ${mysql.escape(input.thoiGianKetThuc)} `);
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart(input.idKhuyenMai);

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM khuyen_mai`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM khuyen_mai `;

    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.converResultGet = function (input) {
    let output = new KhuyenMai();

    output.idKhuyenMai = input.ID_KHUYEN_MAI;

    output.ten = input.TEN;

    output.thoiGianDienRa = input.THOI_GIAN_DIEN_RA;

    output.thoiGianKetThuc = input.THOI_GIAN_KET_THUC;

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
