/*** 
File: nhanvien.js 
***/

class Nhanvien {
    constructor(maNhanVien = null, maTaiKhoan = null, ten = null, ngaySinh = null, soDienThoai = null, diaChi = null) {
this.maNhanVien = maNhanVien;
this.maTaiKhoan = maTaiKhoan;
this.ten = ten;
this.ngaySinh = ngaySinh;
this.soDienThoai = soDienThoai;
this.diaChi = diaChi;
    }
}

module.exports = Nhanvien;
