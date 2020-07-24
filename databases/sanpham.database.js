//Import liblaries
const mysql = require('mysql');

//Import Class
const baseDatabase = require('./base.database');
const SanPham = require('../models/sanpham');

module.exports.createWHEREPart = function (input, isAllowGetAll = false, isPrimarykeyOnly = false) {
    let query = '';
    if (input) {
        //Input is the id
        if (typeof input === 'number' || typeof input === 'string') {
            query += ` AND ID_SAN_PHAM = ${mysql.escape(input)} `;
        }
        //Input is object
        else if (typeof input === 'object') {
            if (input.idSanPham) {
                query += ` AND ID_SAN_PHAM = ${mysql.escape(input.idSanPham)} `;
                if (isPrimarykeyOnly) {
                    return ` WHERE 1=1 ${query}`;
                }
            }

            if (input.idLoaiSanPham) {
                query += ` AND ID_LOAI_SAN_PHAM = ${mysql.escape(input.idLoaiSanPham)} `;
            }

            if (input.ten) {
                query += ` AND TEN = ${mysql.escape(input.ten)} `;
            }

            if (input.gia) {
                query += ` AND GIA = ${mysql.escape(input.gia)} `;
            }

            if (input.diemTichLuy) {
                query += ` AND DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `;
            }

            if (input.ghiChu) {
                query += ` AND GHI_CHU = ${mysql.escape(input.ghiChu)} `;
            }

            if (input.linkAnh) {
                query += ` AND LINK_ANH = ${mysql.escape(input.linkAnh)} `;
            }
        }
        //Input is Array
        else if (typeof input === 'array' && input.length > 0) {
            query += ' AND (';
            query += input
                .map((item) => {
                    if (typeof item === 'number' || typeof item === 'string') {
                        return ` ID_SAN_PHAM = ${mysql.escape(item)} `;
                    }
                    return ` ID_SAN_PHAM = ${mysql.escape(item.idSanPham)} `;
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
    let query = 'SELECT * FROM san_pham';
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryPost = function (input) {
    if (!input.idSanPham) {
        input.idSanPham = null;
    }

    if (!input.idLoaiSanPham) {
        input.idLoaiSanPham = null;
    }

    if (!input.ten) {
        input.ten = null;
    }

    if (!input.gia) {
        input.gia = null;
    }

    if (!input.diemTichLuy) {
        input.diemTichLuy = null;
    }

    if (!input.ghiChu) {
        input.ghiChu = null;
    }

    if (!input.linkAnh) {
        input.linkAnh = null;
    }

    let query = `INSERT INTO san_pham (ID_SAN_PHAM,ID_LOAI_SAN_PHAM,TEN,GIA,DIEM_TICH_LUY,GHI_CHU,LINK_ANH) VALUES ( ${mysql.escape(input.idSanPham)},${mysql.escape(input.idLoaiSanPham)},${mysql.escape(input.ten)},${mysql.escape(input.gia)},${mysql.escape(input.diemTichLuy)},${mysql.escape(input.ghiChu)},${mysql.escape(input.linkAnh)} )`;
    return query;
};

module.exports.createQueryPatch = function (input) {
    let query = `UPDATE san_pham SET `;
    let queryChanges = [];

    if (input.idLoaiSanPham) {
        queryChanges.push(` ID_LOAI_SAN_PHAM = ${mysql.escape(input.idLoaiSanPham)} `);
    }

    if (input.ten) {
        queryChanges.push(` TEN = ${mysql.escape(input.ten)} `);
    }

    if (input.gia) {
        queryChanges.push(` GIA = ${mysql.escape(input.gia)} `);
    }

    if (input.diemTichLuy) {
        queryChanges.push(` DIEM_TICH_LUY = ${mysql.escape(input.diemTichLuy)} `);
    }

    if (input.ghiChu) {
        queryChanges.push(` GHI_CHU = ${mysql.escape(input.ghiChu)} `);
    }

    if (input.linkAnh) {
        queryChanges.push(` LINK_ANH = ${mysql.escape(input.linkAnh)} `);
    }

    if (!input.oldIdSanPham) {
        input.oldIdSanPham = input.idSanPham;
    }

    query += queryChanges.join(',');
    query += module.exports.createWHEREPart({ idSanPham: input.oldIdSanPham, idLoaiSanPham: input.oldIdLoaiSanPham, ten: input.oldTen, gia: input.oldGia, diemTichLuy: input.oldDiemTichLuy, ghiChu: input.oldGhiChu, linkAnh: input.oldLinkAnh });

    return query;
};

module.exports.createQueryDelete = function (input) {
    let query = `DELETE FROM san_pham`;
    query += module.exports.createWHEREPart(input, true);
    return query;
};

module.exports.createQueryExists = function (input, isPrimarykeyOnly) {
    let query = `SELECT COUNT(*) AS NUMBER_ROWS FROM san_pham `;

    if (isPrimarykeyOnly) {
        query += module.exports.createWHEREPart({ idSanPham: input.idSanPham }, false, true);
    } else {
        query += module.exports.createWHEREPart(input, false, true);
    }

    return query;
};

module.exports.converResultGet = function (input) {
    let output = new SanPham();

    output.idSanPham = input.ID_SAN_PHAM;

    output.idLoaiSanPham = input.ID_LOAI_SAN_PHAM;

    output.ten = input.TEN;

    output.gia = input.GIA;

    output.diemTichLuy = input.DIEM_TICH_LUY;

    output.ghiChu = input.GHI_CHU;

    output.linkAnh = input.LINK_ANH;

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
    if (!input.idSanPham && !input.oldIdSanPham) {
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