//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const DatBan = require('../models/datban');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is object
        if (typeof input === 'object') {
            //Input is Object

            if (input.idTaiKhoan) {
                query += ` AND ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `;
            }

            if (input.idBan) {
                query += ` AND ID_BAN = ${mysql.escape(input.idBan)} `;
            }

            if (input.thoiGianLap) {
                query += ` AND THOI_GIAN_LAP = ${mysql.escape(input.thoiGianLap)} `;
            }

            if (input.idTaiKhoan || input.idBan || input.thoiGianLap) {
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.thoiGianNhan) {
                query += ` AND THOI_GIAN_NHAN = ${mysql.escape(input.thoiGianNhan)} `;
            }

            if (input.ghiChu) {
                query += ` AND GHI_CHU = ${mysql.escape(input.ghiChu)} `;
            }

            if (input.idHoaDon) {
                query += ` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `;
            }
        }
        //Input is Array of Object
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input.map((item) => ` ( ID_TAI_KHOAN = mysql.escape(item.idTaiKhoan)} AND ID_BAN = mysql.escape(item.idBan)} AND THOI_GIAN_LAP = mysql.escape(item.thoiGianLap)} ) `).join(' OR ');
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
    let query = 'SELECT * FROM dat_ban';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idTaiKhoan) {
        input.idTaiKhoan = null;
    }

    if (!input.idBan) {
        input.idBan = null;
    }

    if (!input.thoiGianLap) {
        input.thoiGianLap = null;
    }

    if (!input.thoiGianNhan) {
        input.thoiGianNhan = null;
    }

    if (!input.ghiChu) {
        input.ghiChu = null;
    }

    if (!input.idHoaDon) {
        input.idHoaDon = null;
    }

    let query = `INSERT INTO dat_ban (ID_TAI_KHOAN,ID_BAN,THOI_GIAN_LAP,THOI_GIAN_NHAN,GHI_CHU,ID_HOA_DON) VALUES ( ${mysql.escape(input.idTaiKhoan)},${mysql.escape(input.idBan)},${mysql.escape(input.thoiGianLap)},${mysql.escape(input.thoiGianNhan)},${mysql.escape(input.ghiChu)},${mysql.escape(input.idHoaDon)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE dat_ban SET `;
    let queryChanges = [];

    if (input.idTaiKhoan) {
        queryChanges.push(` AND ID_TAI_KHOAN = ${mysql.escape(input.idTaiKhoan)} `);
    }

    if (input.idBan) {
        queryChanges.push(` AND ID_BAN = ${mysql.escape(input.idBan)} `);
    }

    if (input.thoiGianLap) {
        queryChanges.push(` AND THOI_GIAN_LAP = ${mysql.escape(input.thoiGianLap)} `);
    }

    if (input.thoiGianNhan) {
        queryChanges.push(` AND THOI_GIAN_NHAN = ${mysql.escape(input.thoiGianNhan)} `);
    }

    if (input.ghiChu) {
        queryChanges.push(` AND GHI_CHU = ${mysql.escape(input.ghiChu)} `);
    }

    if (input.idHoaDon) {
        queryChanges.push(` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `);
    }

    if (!input.oldIdTaiKhoan) {
        input.oldIdTaiKhoan = input.idTaiKhoan;
    }

    if (!input.oldIdBan) {
        input.oldIdBan = input.idBan;
    }

    if (!input.oldThoiGianLap) {
        input.oldThoiGianLap = input.thoiGianLap;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idTaiKhoan: input.oldIdTaiKhoan, idBan: input.oldIdBan, thoiGianLap: input.oldThoiGianLap, thoiGianNhan: input.oldThoiGianNhan, ghiChu: input.oldGhiChu, idHoaDon: input.oldIdHoaDon });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM dat_ban`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM dat_ban `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idTaiKhoan: input.idTaiKhoan, idBan: input.idBan, thoiGianLap: input.thoiGianLap }, true);
    } else {
        query += module.exports.createWHEREPart(input, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new DatBan();

    output.idTaiKhoan = input.ID_TAI_KHOAN;

    output.idBan = input.ID_BAN;

    output.thoiGianLap = input.THOI_GIAN_LAP;

    output.thoiGianNhan = input.THOI_GIAN_NHAN;

    output.ghiChu = input.GHI_CHU;

    output.idHoaDon = input.ID_HOA_DON;

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
    if ((!input.idTaiKhoan && !input.oldIdTaiKhoan) || (!input.idBan && !input.oldIdBan) || (!input.thoiGianLap && !input.oldThoiGianLap)) {
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
