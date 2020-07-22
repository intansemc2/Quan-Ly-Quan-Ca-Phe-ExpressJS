//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const ThanhToanHoaDon = require('../models/thanhtoanhoadon');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = ` WHERE 1=1 `;
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_HOA_DON = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object' && input.constructor === ThanhToanHoaDon) {
            if (input.idHoaDon) {
                query += ` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `;
                if (isPrimarykeyOnly) {
                    return query;
                }
            }

            if (input.idTaiKhoanThanhToan) {
                query += ` AND ID_TAI_KHOAN_THANH_TOAN = ${mysql.escape(input.idTaiKhoanThanhToan)} `;
            }

            if (input.thoiGianThanhToan) {
                query += ` AND THOI_GIAN_THANH_TOAN = ${mysql.escape(input.thoiGianThanhToan)} `;
            }

            if (input.phanTramTichLuy) {
                query += ` AND PHAN_TRAM_TICH_LUY = ${mysql.escape(input.phanTramTichLuy)} `;
            }

            if (input.soLuongDiemDoi) {
                query += ` AND SO_LUONG_DIEM_DOI = ${mysql.escape(input.soLuongDiemDoi)} `;
            }

            if (input.tyGiaDiemDoi) {
                query += ` AND TY_GIA_DIEM_DOI = ${mysql.escape(input.tyGiaDiemDoi)} `;
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
    return query;
};

module.exports.createQueryGet = function (input) {
    let query = 'SELECT * FROM thanh_toan_hoa_don';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    let query = `INSERT INTO thanh_toan_hoa_don (ID_HOA_DON,ID_TAI_KHOAN_THANH_TOAN,THOI_GIAN_THANH_TOAN,PHAN_TRAM_TICH_LUY,SO_LUONG_DIEM_DOI,TY_GIA_DIEM_DOI) VALUES ( ${mysql.escape(input.idHoaDon)},${mysql.escape(input.idTaiKhoanThanhToan)},${mysql.escape(input.thoiGianThanhToan)},${mysql.escape(input.phanTramTichLuy)},${mysql.escape(input.soLuongDiemDoi)},${mysql.escape(input.tyGiaDiemDoi)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE thanh_toan_hoa_don SET `;
    let queryChanges = [];

    if (input.idTaiKhoanThanhToan) {
        queryChanges.push(` ID_TAI_KHOAN_THANH_TOAN = ${mysql.escape(input.idTaiKhoanThanhToan)} `);
    }

    if (input.thoiGianThanhToan) {
        queryChanges.push(` THOI_GIAN_THANH_TOAN = ${mysql.escape(input.thoiGianThanhToan)} `);
    }

    if (input.phanTramTichLuy) {
        queryChanges.push(` PHAN_TRAM_TICH_LUY = ${mysql.escape(input.phanTramTichLuy)} `);
    }

    if (input.soLuongDiemDoi) {
        queryChanges.push(` SO_LUONG_DIEM_DOI = ${mysql.escape(input.soLuongDiemDoi)} `);
    }

    if (input.tyGiaDiemDoi) {
        queryChanges.push(` TY_GIA_DIEM_DOI = ${mysql.escape(input.tyGiaDiemDoi)} `);
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart(input.idHoaDon);

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM thanh_toan_hoa_don`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM thanh_toan_hoa_don `;

    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.converResultGet = function (input) {
    let output = new ThanhToanHoaDon();

    output.idHoaDon = input.ID_HOA_DON;

    output.idTaiKhoanThanhToan = input.ID_TAI_KHOAN_THANH_TOAN;

    output.thoiGianThanhToan = input.THOI_GIAN_THANH_TOAN;

    output.phanTramTichLuy = input.PHAN_TRAM_TICH_LUY;

    output.soLuongDiemDoi = input.SO_LUONG_DIEM_DOI;

    output.tyGiaDiemDoi = input.TY_GIA_DIEM_DOI;

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
