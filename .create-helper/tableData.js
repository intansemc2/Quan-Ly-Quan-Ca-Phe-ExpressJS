module.exports.tableData = [
    {
        classname: 'taiKhoan',
        speak: 'tài khoản',
        properties: [
            { name: 'maTaiKhoan', type: 'int', speak: 'mã tài khoản', isNull: false },
            { name: 'tenDangNhap', type: 'string', speak: 'tên đăng nhập', isNull: false },
            { name: 'matKhau', type: 'string', speak: 'mật khẩu', isNull: false },
            { name: 'loai', type: 'string', speak: 'loại tài khoản', isNull: false }
        ],
        keys: ['maTaiKhoan']
    },

    {
        classname: 'nguonSanPham',
        speak: 'nguồn sản phẩm',
        properties: [
            { name: 'maNguonSanPham', type: 'int', speak: 'mã nguồn sản phẩm', isNull: false },
            { name: 'ten', type: 'string', speak: 'tên', isNull: false },
            { name: 'soDienThoai', type: 'string', speak: 'số điện thoại', isNull: false },
            { name: 'diaChi', type: 'string', speak: 'địa chỉ', isNull: false },
        ],
        keys: ['maNguonSanPham']
    },

    {
        classname: 'ban',
        speak: 'bàn',
        properties: [
            { name: 'maBan', type: 'int', speak: 'mã bàn', isNull: false },
            { name: 'ten', type: 'string', speak: 'tên', isNull: false },
        ],
        keys: ['maBan']
    },

    {
        classname: 'sanPham',
        speak: 'sản phẩm',
        properties: [
            { name: 'maSanPham', type: 'int', speak: 'mã sản phẩm', isNull: false },
            { name: 'ten', type: 'string', speak: 'tên', isNull: false },
            { name: 'linkAnh', type: 'string', speak: 'link ảnh', isNull: true },
            { name: 'loai', type: 'string', speak: 'loại', isNull: true },
            { name: 'gia', type: 'int', speak: 'giá', isNull: false },
        ],
        keys: ['maSanPham']
    },

    {
        classname: 'nhanVien',
        speak: 'nhân viên',
        properties: [
            { name: 'maNhanVien', type: 'int', speak: 'mã nhân viên', isNull: false },
            { name: 'maTaiKhoan', type: 'int', speak: 'mã tài khoản', isNull: false },
            { name: 'ten', type: 'string', speak: 'tên', isNull: false },
            { name: 'ngaySinh', type: 'date', speak: 'ngày sinh', isNull: false },
            { name: 'soDienThoai', type: 'string', speak: 'số điện thoại', isNull: false },
            { name: 'diaChi', type: 'string', speak: 'địa chỉ', isNull: false },
        ],
        keys: ['maNhanVien']
    },

    {
        classname: 'khachHang',
        speak: 'khách hàng',
        properties: [
            { name: 'maKhachHang', type: 'int', speak: 'mã khách hàng', isNull: false },
            { name: 'maTaiKhoan', type: 'int', speak: 'mã tài khoản', isNull: true },
            { name: 'ten', type: 'string', speak: 'tên', isNull: false },
            { name: 'ngaySinh', type: 'date', speak: 'ngày sinh', isNull: false },
            { name: 'soDienThoai', type: 'string', speak: 'số điện thoại', isNull: false },
            { name: 'ghiChu', type: 'string', speak: 'ghi chú', isNull: true },
        ],
        keys: ['maKhachHang']
    },

    {
        classname: 'xuatHang',
        speak: 'xuất hàng',
        properties: [
            { name: 'maXuatHang', type: 'int', speak: 'mã xuất hàng', isNull: false },
            { name: 'ngayGioXuat', type: 'datetime', speak: 'ngày giờ xuất', isNull: false },
            { name: 'maNhanVien', type: 'int', speak: 'mã nhân viên', isNull: false },
            { name: 'maKhachHang', type: 'int', speak: 'mã khách hàng', isNull: false },
            { name: 'maBan', type: 'int', speak: 'mã bàn', isNull: false },
            { name: 'ghiChu', type: 'int', speak: 'ghi chú', isNull: true },
        ],
        keys: ['maXuatHang']
    },

    {
        classname: 'nhapHang',
        speak: 'nhập hàng',
        properties: [
            { name: 'maNhapHang', type: 'int', speak: 'mã nhập hàng', isNull: false },
            { name: 'maNguonSanPham', type: 'int', speak: 'mã nguồn sản phẩm', isNull: false },
            { name: 'ngayGioNhap', type: 'datetime', speak: 'ngày giờ nhập', isNull: false },
            { name: 'maNhanVien', type: 'int', speak: 'mã nhân viên', isNull: false },
            { name: 'ghiChu', type: 'string', speak: 'ghi chú', isNull: true },
        ],
        keys: ['maNhapHang']
    },

    {
        classname: 'chiTietXuatHang',
        speak: 'chi tiết xuất hàng',
        properties: [
            { name: 'maXuatHang', type: 'int', speak: 'mã xuất hàng', isNull: false },
            { name: 'maSanPham', type: 'int', speak: 'mã sản phẩm', isNull: false },
            { name: 'soLuong', type: 'int', speak: 'số lượng', isNull: false },
            { name: 'donGia', type: 'int', speak: 'đơn giá', isNull: false },
        ],
        keys: ['maXuatHang', 'maSanPham']
    },

    {
        classname: 'chiTietNhapHang',
        speak: 'chi tiết nhập hàng',
        properties: [
            { name: 'maNhapHang', type: 'int', speak: 'mã nhập hàng', isNull: false },
            { name: 'maSanPham', type: 'int', speak: 'mã sản phẩm', isNull: false },
            { name: 'soLuong', type: 'int', speak: 'số lượng', isNull: false },
            { name: 'donGia', type: 'int', speak: 'đơn giá', isNull: false },
        ],
        keys: ['maNhapHang', 'maSanPham']
    },
];
