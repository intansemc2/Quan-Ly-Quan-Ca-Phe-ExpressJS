module.exports.index = function (request, response, next) {
    response.render('users/index.pug', {
        title: "Trang chủ - Quản lý quán cà phê",
        taiKhoan: {},
        loaiSanPhams: [{idLoaiSanPham: 0, ten: '0'}],
        sanPhams: [{idSanPham: 0, idLoaiSanPham: 0, ten: 'sp 0'}]
    });
    next();
};