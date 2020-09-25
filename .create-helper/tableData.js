module.exports.tableData = [
    {
        classname: 'taiKhoan',
        speak: 'tài khoản',
        properties: [
            { name: 'maTaiKhoan', type: 'int', speak: 'mã tài khoản', isNull: false },
            { name: 'tenDangNhap', type: 'string', speak: 'đăng nhập', isNull: false },
            { name: 'matKhau', type: 'string', speak: 'mật khẩu', isNull: false },
            { name: 'loai', type: 'string', speak: 'loại tài khoản', isNull: false }
        ],
        keys: ['maTaiKhoan'],
    }
];
