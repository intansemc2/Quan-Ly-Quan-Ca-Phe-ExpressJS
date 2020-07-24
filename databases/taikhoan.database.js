//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const TaiKhoan = require('../models/taikhoan');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_TAI_KHOAN = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idTaiKhoan) {
                query += ` AND ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.username) {
                query += ` AND USERNAME = ${mysql.escape(input.username)} `;
            }

            if (input.password) {
                query += ` AND PASSWORD = ${mysql.escape(input.password)} `;
            }

            if (input.loai) {
                query += ` AND LOAI = ${mysql.escape(input.loai)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_TAI_KHOAN = ${mysql.escape(item)} `;
                    }
                    return ` ID_TAI_KHOAN = ${mysql.escape(item.idTaiKhoan)} `;
                })
                .join(' OR ');
            query += ')';
        }
    }

    if (query !== '' || (isAllowGetAll && query === '')) {
        query = ` WHERE 1=1 ${query}`;
    } else {
        query = ' WHERE 1=0 ';
    }

    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM tai_khoan';
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idTaiKhoan) {
        input.idTaiKhoan = null;
    }

    if (!input.username) {
        input.username = null;
    }

    if (!input.password) {
        input.password = null;
    }

    if (!input.loai) {
        input.loai = null;
    }

    let query = `INSERT INTO tai_khoan (ID_TAI_KHOAN,USERNAME,PASSWORD,LOAI) VALUES ( ${mysql.escape(input.idTaiKhoan)},${mysql.escape(input.username)},${mysql.escape(input.password)},${mysql.escape(input.loai)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE tai_khoan SET `;
    let queryChanges = [];

    if (input.username) {
        queryChanges.push(` USERNAME = ${mysql.escape(input.username)} `);
    }

    if (input.password) {
        queryChanges.push(` PASSWORD = ${mysql.escape(input.password)} `);
    }

    if (input.loai) {
        queryChanges.push(` LOAI = ${mysql.escape(input.loai)} `);
    }

    if (!input.oldIdTaiKhoan) {
        input.oldIdTaiKhoan = input.idTaiKhoan;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idTaiKhoan: input.oldIdTaiKhoan, username: input.oldUsername, password: input.oldPassword, loai: input.oldLoai });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM tai_khoan`;
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM tai_khoan `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idTaiKhoan: input.idTaiKhoan }, false, true);
    } else {
        query += module.exports.createWHEREPart(input, false, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new TaiKhoan();

    output.idTaiKhoan = input.ID_TAI_KHOAN;

    output.username = input.USERNAME;

    output.password = input.PASSWORD;

    output.loai = input.LOAI;

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
    if (!input.idTaiKhoan && !input.oldIdTaiKhoan) {
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
