class TaiKhoan {
    constructor(idTaiKhoan = null, username = null, password = null, loai = null) {
        this.idTaiKhoan = idTaiKhoan;
        this.username = username;
        this.password = password;
        this.loai = loai;
    }
}

TaiKhoan.LOAI_ADMIN = 0;
TaiKhoan.LOAI_STAFF = 1;
TaiKhoan.LOAI_USER = 2;
TaiKhoan.LOAI_NAMES = ["ADMIN", "STAFF", "USER"];

module.exports = TaiKhoan;