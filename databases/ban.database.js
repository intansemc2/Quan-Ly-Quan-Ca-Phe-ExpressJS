//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Ban = require('../models/ban');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = ` WHERE 1=1 `;
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_BAN = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object' && input.constructor === Ban) {
            if (input.idBan) {
                query += ` AND ID_BAN = ${mysql.escape(input.idBan)} `;
                if (isPrimarykeyOnly) {
                    return query;
                }
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.trangThai) {
                query += ` AND TRANG_THAI = ${mysql.escape(input.trangThai)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_BAN = ${mysql.escape(item)} `;
                    }
                    return ` ID_BAN = ${mysql.escape(item.idBan)} `;
                })
                .join(' OR ');
            query += ')';
        }
    }
    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM ban';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    let query = `INSERT INTO ban (ID_BAN,TEN,TRANG_THAI) VALUES ( ${mysql.escape(input.idBan)},${mysql.escape(input.ten)},${mysql.escape(input.trangThai)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE ban SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.trangThai) {
        queryChanges.push(` TRANG_THAI = ${mysql.escape(input.trangThai)} `);
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart(input.idBan);

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM ban`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM ban `;

    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.converResultGet = function (input) {
    let output = new Ban();

    output.idBan = input.ID_BAN;

    output.ten = input.TEN;

    output.trangThai = input.TRANG_THAI;

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
