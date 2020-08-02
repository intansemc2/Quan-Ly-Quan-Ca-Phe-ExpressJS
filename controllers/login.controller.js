module.exports.login = function (request, response, next) {
    response.render('logins/login.pug');
    next();
};

module.exports.forgotPassword = function (request, response, next) {
    response.render('logins/forgot-password.pug');
    next();
};

module.exports.logout = function (request, response, next) {
    response.render('logins/logout.pug');
    next();
};
