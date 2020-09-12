module.exports.index = function (request, response, next) {
    response.render('users/index.pug', {
        title: "Trang chủ - Quản lý quán cà phê",
        taiKhoan: {}
    });
    next();
};

module.exports.reservationTable = function (request, response, next) {
    response.render('users/reservation-table.pug', {
        title: "Trang đặt bàn - Quản lý quán cà phê",
        taiKhoan: {}
    });
    next();
}

module.exports.reservationFood = function (request, response, next) {
    response.render('users/reservation-food.pug', {
        title: "Trang đặt món ăn - Quản lý quán cà phê",
        taiKhoan: {}
    });
    next();
}

module.exports.accountManager = function (request, response, next) {
    response.render('users/account-manager.pug', {
        title: "Trang quản lý tài khoản - Quản lý quán cà phê",
        taiKhoan: {}
    });
    next();
}
