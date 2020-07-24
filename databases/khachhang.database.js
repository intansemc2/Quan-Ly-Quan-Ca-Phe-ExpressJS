//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const KhachHang = require('../models/khachhang');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_KHACH_HANG = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idKhachHang) {
                query += ` AND ID_KHACH_HANG = ${mysql.escape(input.idKhachHang)} `;
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

            if (input.idTaiKhoan) {
                query += ` AND ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `;
            }

            if (input.diemTichLuy) {
                query += ` AND DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_KHACH_HANG = ${mysql.escape(item)} `;
                    }
                    return ` ID_KHACH_HANG = ${mysql.escape(item.idKhachHang)} `;
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
    let query = 'SELECT * FROM khach_hang';
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idKhachHang) {
        input.idKhachHang = null;
    }

    if (!input.ten) {
        input.ten = null;
    }

    if (!input.sdt) {
        input.sdt = null;
    }

    if (!input.idTaiKhoan) {
        input.idTaiKhoan = null;
    }

    if (!input.diemTichLuy) {
        input.diemTichLuy = null;
    }

    let query = `INSERT INTO khach_hang (ID_KHACH_HANG,TEN,SDT,ID_TAI_KHOAN,DIEM_TICH_LUY) VALUES ( ${mysql.escape(input.idKhachHang)},${mysql.escape(input.ten)},${mysql.escape(input.sdt)},${mysql.escape(input.idTaiKhoan)},${mysql.escape(input.diemTichLuy)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE khach_hang SET `;
    let queryChanges = [];

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.sdt) {
        queryChanges.push(` SDT = ${mysql.escape(input.sdt)} `);
    }

    if (input.idTaiKhoan) {
        queryChanges.push(` ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `);
    }

    if (input.diemTichLuy) {
        queryChanges.push(` DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `);
    }

    if (!input.oldIdKhachHang) {
        input.oldIdKhachHang = input.idKhachHang;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idKhachHang: input.oldIdKhachHang, ten: input.oldTen, sdt: input.oldSdt, idTaiKhoan: input.oldIdTaiKhoan, diemTichLuy: input.oldDiemTichLuy });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM khach_hang`;
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM khach_hang `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idKhachHang: input.idKhachHang }, false, true);
    } else {
        query += module.exports.createWHEREPart(input, false, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new KhachHang();

    output.idKhachHang = input.ID_KHACH_HANG;

    output.ten = input.TEN;

    output.sdt = input.SDT;

    output.idTaiKhoan = input.ID_TAI_KHOAN;

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
    if (!input.idKhachHang && !input.oldIdKhachHang) {
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
