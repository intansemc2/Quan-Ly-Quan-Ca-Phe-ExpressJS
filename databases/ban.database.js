/*** 
File: ban.database.js 
***/

//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const ban = require('../models/ban');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND maBan = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.maban) {
                query += ` AND maBan = ${mysql.escape(input.maban)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.ten) {
                query += ` AND ten = ${mysql.escape(input.ten)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` maBan = ${mysql.escape(item)} `;
                    }
                    return ` maBan = ${mysql.escape(item.maban)} `;
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
    let query = 'SELECT * FROM ban';
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.maban) {
        input.maban = null;
    }

    if (!input.ten) {
        input.ten = null;
    }

    let query = `INSERT INTO ban (maBan,ten) VALUES ( ${mysql.escape(input.maban)},${mysql.escape(input.ten)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE ban SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` ten = ${mysql.escape(input.ten)} `);
    }

    if (!input.oldmaban) {
        input.oldmaban = input.maban;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ maban: input.oldmaban, ten: input.oldten });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM ban`;
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM ban `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ maban: input.maban }, false, true);
    } else {
        query += module.exports.createWHEREPart(input, false, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new ban();

    output.maban = input.maBan;

    output.ten = input.ten;

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
    if (!input.maban && !input.oldmaban) {
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
