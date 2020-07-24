//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const NhanVien = require('../models/nhanvien');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_NHAN_VIEN = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idNhanVien) {
                query += ` AND ID_NHAN_VIEN = ${mysql.escape(input.idNhanVien)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.sdt) {
                query += ` AND SDT = ${mysql.escape(input.sdt)} `;
            }

            if (input.loai) {
                query += ` AND LOAI = ${mysql.escape(input.loai)} `;
            }

            if (input.idTaiKhoan) {
                query += ` AND ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_NHAN_VIEN = ${mysql.escape(item)} `;
                    }
                    return ` ID_NHAN_VIEN = ${mysql.escape(item.idNhanVien)} `;
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
    let query = 'SELECT * FROM nhan_vien';
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idNhanVien) {
        input.idNhanVien = null;
    }

    if (!input.ten) {
        input.ten = null;
    }

    if (!input.sdt) {
        input.sdt = null;
    }

    if (!input.loai) {
        input.loai = null;
    }

    if (!input.idTaiKhoan) {
        input.idTaiKhoan = null;
    }

    let query = `INSERT INTO nhan_vien (ID_NHAN_VIEN,TEN,SDT,LOAI,ID_TAI_KHOAN) VALUES ( ${mysql.escape(input.idNhanVien)},${mysql.escape(input.ten)},${mysql.escape(input.sdt)},${mysql.escape(input.loai)},${mysql.escape(input.idTaiKhoan)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE nhan_vien SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.sdt) {
        queryChanges.push(` SDT = ${mysql.escape(input.sdt)} `);
    }

    if (input.loai) {
        queryChanges.push(` LOAI = ${mysql.escape(input.loai)} `);
    }

    if (input.idTaiKhoan) {
        queryChanges.push(` ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `);
    }

    if (!input.oldIdNhanVien) {
        input.oldIdNhanVien = input.idNhanVien;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idNhanVien: input.oldIdNhanVien, ten: input.oldTen, sdt: input.oldSdt, loai: input.oldLoai, idTaiKhoan: input.oldIdTaiKhoan });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM nhan_vien`;
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM nhan_vien `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idNhanVien: input.idNhanVien }, false, true);
    } else {
        query += module.exports.createWHEREPart(input, false, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new NhanVien();

    output.idNhanVien = input.ID_NHAN_VIEN;

    output.ten = input.TEN;

    output.sdt = input.SDT;

    output.loai = input.LOAI;

    output.idTaiKhoan = input.ID_TAI_KHOAN;

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
    if (!input.idNhanVien && !input.oldIdNhanVien) {
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
