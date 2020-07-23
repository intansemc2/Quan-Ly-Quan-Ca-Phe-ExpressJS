//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const LoaiSanPham = require('../models/loaisanpham');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_LOAI_SAN_PHAM = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idLoaiSanPham) {
                query += ` AND ID_LOAI_SAN_PHAM = ${mysql.escape(input.idLoaiSanPham)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.linkAnh) {
                query += ` AND LINK_ANH = ${mysql.escape(input.linkAnh)} `;
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
                        return ` ID_LOAI_SAN_PHAM = ${mysql.escape(item)} `;
                    }
                    return ` ID_LOAI_SAN_PHAM = ${mysql.escape(item.idLoaiSanPham)} `;
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
    let query = 'SELECT * FROM loai_san_pham';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idLoaiSanPham) {
        input.idLoaiSanPham = null;
    }

    if (!input.ten) {
        input.ten = null;
    }

    if (!input.linkAnh) {
        input.linkAnh = null;
    }

    if (!input.ghiChu) {
        input.ghiChu = null;
    }

    let query = `INSERT INTO loai_san_pham (ID_LOAI_SAN_PHAM,TEN,LINK_ANH,GHI_CHU) VALUES ( ${mysql.escape(input.idLoaiSanPham)},${mysql.escape(input.ten)},${mysql.escape(input.linkAnh)},${mysql.escape(input.ghiChu)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE loai_san_pham SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.linkAnh) {
        queryChanges.push(` LINK_ANH = ${mysql.escape(input.linkAnh)} `);
    }

    if (input.ghiChu) {
        queryChanges.push(` GHI_CHU = ${mysql.escape(input.ghiChu)} `);
    }

    if (!input.oldIdLoaiSanPham) {
        input.oldIdLoaiSanPham = input.idLoaiSanPham;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idLoaiSanPham: input.oldIdLoaiSanPham, ten: input.oldTen, linkAnh: input.oldLinkAnh, ghiChu: input.oldGhiChu });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM loai_san_pham`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM loai_san_pham `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idLoaiSanPham: input.idLoaiSanPham }, true);
    } else {
        query += module.exports.createWHEREPart(input, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new LoaiSanPham();

    output.idLoaiSanPham = input.ID_LOAI_SAN_PHAM;

    output.ten = input.TEN;

    output.linkAnh = input.LINK_ANH;

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
    if (!input.idLoaiSanPham && !input.oldIdLoaiSanPham) {
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
