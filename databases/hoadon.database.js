//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const HoaDon = require('../models/hoadon');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_HOA_DON = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idHoaDon) {
                query += ` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.idKhachHang) {
                query += ` AND ID_KHACH_HANG = ${mysql.escape(input.idKhachHang)} `;
            }

            if (input.idBan) {
                query += ` AND ID_BAN = ${mysql.escape(input.idBan)} `;
            }

            if (input.idNhanVien) {
                query += ` AND ID_NHAN_VIEN = ${mysql.escape(input.idNhanVien)} `;
            }

            if (input.thoiGianLap) {
                query += ` AND THOI_GIAN_LAP = ${mysql.escape(input.thoiGianLap)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_HOA_DON = ${mysql.escape(item)} `;
                    }
                    return ` ID_HOA_DON = ${mysql.escape(item.idHoaDon)} `;
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
    let query = 'SELECT * FROM hoa_don';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idHoaDon) {
        input.idHoaDon = null;
    }

    if (!input.idKhachHang) {
        input.idKhachHang = null;
    }

    if (!input.idBan) {
        input.idBan = null;
    }

    if (!input.idNhanVien) {
        input.idNhanVien = null;
    }

    if (!input.thoiGianLap) {
        input.thoiGianLap = null;
    }

    let query = `INSERT INTO hoa_don (ID_HOA_DON,ID_KHACH_HANG,ID_BAN,ID_NHAN_VIEN,THOI_GIAN_LAP) VALUES ( ${mysql.escape(input.idHoaDon)},${mysql.escape(input.idKhachHang)},${mysql.escape(input.idBan)},${mysql.escape(input.idNhanVien)},${mysql.escape(input.thoiGianLap)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE hoa_don SET `;
    let queryChanges = [];

    if (input.idKhachHang) {
        queryChanges.push(` ID_KHACH_HANG = ${mysql.escape(input.idKhachHang)} `);
    }

    if (input.idBan) {
        queryChanges.push(` ID_BAN = ${mysql.escape(input.idBan)} `);
    }

    if (input.idNhanVien) {
        queryChanges.push(` ID_NHAN_VIEN = ${mysql.escape(input.idNhanVien)} `);
    }

    if (input.thoiGianLap) {
        queryChanges.push(` THOI_GIAN_LAP = ${mysql.escape(input.thoiGianLap)} `);
    }

    if (!input.oldIdHoaDon) {
        input.oldIdHoaDon = input.idHoaDon;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idHoaDon: input.oldIdHoaDon, idKhachHang: input.oldIdKhachHang, idBan: input.oldIdBan, idNhanVien: input.oldIdNhanVien, thoiGianLap: input.oldThoiGianLap });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM hoa_don`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM hoa_don `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idHoaDon: input.idHoaDon }, true);
    } else {
        query += module.exports.createWHEREPart(input, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new HoaDon();

    output.idHoaDon = input.ID_HOA_DON;

    output.idKhachHang = input.ID_KHACH_HANG;

    output.idBan = input.ID_BAN;

    output.idNhanVien = input.ID_NHAN_VIEN;

    output.thoiGianLap = input.THOI_GIAN_LAP;

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
    if (!input.idHoaDon && !input.oldIdHoaDon) {
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
