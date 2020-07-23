//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const Ban = require('../models/ban');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_BAN = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idBan) {
                query += ` AND ID_BAN = ${mysql.escape(input.idBan)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.ghiChu) {
                query += ` AND GHI_CHU = ${mysql.escape(input.ghiChu)} `;
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

    if (query !== '') {
        query = ` WHERE 1=1 ${query}`;
    } else {
        query = ' WHERE 1=0 ';
    }

    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM ban';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idBan) {
        input.idBan = null;
    }

    if (!input.ten) {
        input.ten = null;
    }

    if (!input.ghiChu) {
        input.ghiChu = null;
    }

    let query = `INSERT INTO ban (ID_BAN,TEN,GHI_CHU) VALUES ( ${mysql.escape(input.idBan)},${mysql.escape(input.ten)},${mysql.escape(input.ghiChu)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE ban SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.ghiChu) {
        queryChanges.push(` GHI_CHU = ${mysql.escape(input.ghiChu)} `);
    }

    if (!input.oldIdBan) {
        input.oldIdBan = input.idBan;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idBan: input.oldIdBan, ten: input.oldTen, ghiChu: input.oldGhiChu });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM ban`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM ban `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idBan: input.idBan }, true);
    } else {
        query += module.exports.createWHEREPart(input, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new Ban();

    output.idBan = input.ID_BAN;

    output.ten = input.TEN;

    output.ghiChu = input.GHI_CHU;

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
    if (!input.idBan && !input.oldIdBan) {
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
