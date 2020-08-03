module.exports.index = function (request, response, next) {
    response.render('users/index.pug', {
        title: "Trang chủ - Quản lý quán cà phê"
    });
    next();
};