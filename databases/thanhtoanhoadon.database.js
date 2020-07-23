//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const ThanhToanHoaDon = require('../models/thanhtoanhoadon');

module.exports.createWHEREPart = function (input, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is object
        if (typeof input === 'object') {
            //Input is Object

            if (input.idHoaDon) {
                query += ` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `;
            }

            if (input.idTaiKhoanThanhToan) {
                query += ` AND ID_TAI_KHOAN_THANH_TOAN = ${mysql.escape(input.idTaiKhoanThanhToan)} `;
            }

            if (input.thoiGianThanhToan) {
                query += ` AND THOI_GIAN_THANH_TOAN = ${mysql.escape(input.thoiGianThanhToan)} `;
            }

            if (input.idHoaDon || input.idTaiKhoanThanhToan || input.thoiGianThanhToan) {
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
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
        //Input is Array of Object
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input.map((item) => ` ( ID_HOA_DON = mysql.escape(item.idHoaDon)} AND ID_TAI_KHOAN_THANH_TOAN = mysql.escape(item.idTaiKhoanThanhToan)} AND THOI_GIAN_THANH_TOAN = mysql.escape(item.thoiGianThanhToan)} ) `).join(' OR ');
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
    let query = 'SELECT * FROM thanh_toan_hoa_don';
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idHoaDon) {
        input.idHoaDon = null;
    }

    if (!input.idTaiKhoanThanhToan) {
        input.idTaiKhoanThanhToan = null;
    }

    if (!input.thoiGianThanhToan) {
        input.thoiGianThanhToan = null;
    }

    if (!input.phanTramTichLuy) {
        input.phanTramTichLuy = null;
    }

    if (!input.soLuongDiemDoi) {
        input.soLuongDiemDoi = null;
    }

    if (!input.tyGiaDiemDoi) {
        input.tyGiaDiemDoi = null;
    }

    let query = `INSERT INTO thanh_toan_hoa_don (ID_HOA_DON,ID_TAI_KHOAN_THANH_TOAN,THOI_GIAN_THANH_TOAN,PHAN_TRAM_TICH_LUY,SO_LUONG_DIEM_DOI,TY_GIA_DIEM_DOI) VALUES ( ${mysql.escape(input.idHoaDon)},${mysql.escape(input.idTaiKhoanThanhToan)},${mysql.escape(input.thoiGianThanhToan)},${mysql.escape(input.phanTramTichLuy)},${mysql.escape(input.soLuongDiemDoi)},${mysql.escape(input.tyGiaDiemDoi)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE thanh_toan_hoa_don SET `;
    let queryChanges = [];

    if (input.idHoaDon) {
        queryChanges.push(` AND ID_HOA_DON = ${mysql.escape(input.idHoaDon)} `);
    }

    if (input.idTaiKhoanThanhToan) {
        queryChanges.push(` AND ID_TAI_KHOAN_THANH_TOAN = ${mysql.escape(input.idTaiKhoanThanhToan)} `);
    }

    if (input.thoiGianThanhToan) {
        queryChanges.push(` AND THOI_GIAN_THANH_TOAN = ${mysql.escape(input.thoiGianThanhToan)} `);
    }

    if (input.phanTramTichLuy) {
        queryChanges.push(` AND PHAN_TRAM_TICH_LUY = ${mysql.escape(input.phanTramTichLuy)} `);
    }

    if (input.soLuongDiemDoi) {
        queryChanges.push(` AND SO_LUONG_DIEM_DOI = ${mysql.escape(input.soLuongDiemDoi)} `);
    }

    if (input.tyGiaDiemDoi) {
        queryChanges.push(` AND TY_GIA_DIEM_DOI = ${mysql.escape(input.tyGiaDiemDoi)} `);
    }

    if (!input.oldIdHoaDon) {
        input.oldIdHoaDon = input.idHoaDon;
    }

    if (!input.oldIdTaiKhoanThanhToan) {
        input.oldIdTaiKhoanThanhToan = input.idTaiKhoanThanhToan;
    }

    if (!input.oldThoiGianThanhToan) {
        input.oldThoiGianThanhToan = input.thoiGianThanhToan;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idHoaDon: input.oldIdHoaDon, idTaiKhoanThanhToan: input.oldIdTaiKhoanThanhToan, thoiGianThanhToan: input.oldThoiGianThanhToan, phanTramTichLuy: input.oldPhanTramTichLuy, soLuongDiemDoi: input.oldSoLuongDiemDoi, tyGiaDiemDoi: input.oldTyGiaDiemDoi });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM thanh_toan_hoa_don`;
    query += module.exports.createWHEREPart(input);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM thanh_toan_hoa_don `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idHoaDon: input.idHoaDon, idTaiKhoanThanhToan: input.idTaiKhoanThanhToan, thoiGianThanhToan: input.thoiGianThanhToan }, true);
    } else {
        query += module.exports.createWHEREPart(input, true);
    }

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
    if ((!input.idHoaDon && !input.oldIdHoaDon) || (!input.idTaiKhoanThanhToan && !input.oldIdTaiKhoanThanhToan) || (!input.thoiGianThanhToan && !input.oldThoiGianThanhToan)) {
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
