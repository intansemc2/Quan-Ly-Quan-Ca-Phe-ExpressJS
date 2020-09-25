/*** 
File: sanpham.js 
***/

class Sanpham {
    constructor(maSanPham = null, ten = null, linkAnh = null, loai = null, gia = null) {
this.maSanPham = maSanPham;
this.ten = ten;
this.linkAnh = linkAnh;
this.loai = loai;
this.gia = gia;
    }
}

module.exports = Sanpham;
