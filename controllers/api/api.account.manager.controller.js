//Import library
const crypto = require('crypto');

//Import Controllers
const errorController = require('../error.controller');

//Import Databases
const taikhoanDatabase = require('../../databases/taiKhoan.database');

//Import Models
const TaiKhoan = require('../../models/taiKhoan');

//Constance
const COOKIE_OPTIONS = { sameSite: 'Lax', maxAge: 30 * 24 * 3600 * 1000 /* 30 day */, httpOnly: true, signed: true };

//Functions
function getLoginInCookie(request) {
    let output = {};

    output.tenDangNhap = request.signedCookies.tenDangNhap;
    output.matKhau = request.signedCookies.matKhau;

    return output;
}

async function getLoginInSession(request) {
    let output = {};

    output = await new Promise(function (resolve, reject) {
        request.sessionStore.get(request.signedCookies.sessionID, function (error, session) {
            if (session) {
                resolve({ tenDangNhap: session.tenDangNhap, matKhau: session.matKhau });
            } else {
                resolve(session);
            }
        });
    });

    return output;
}

function setLoginInCookie(response, input) {
    let output = {};

    response.cookie('tenDangNhap', input.tenDangNhap, COOKIE_OPTIONS);
    response.cookie('matKhau', input.matKhau, COOKIE_OPTIONS);

    return output;
}

function setLoginInSession(request, response, input) {
    let output = {};

    let sessionID = request.signedCookies.sessionID || request.sessionID;
    response.cookie('sessionID', sessionID, COOKIE_OPTIONS);
    request.sessionStore.set(sessionID, { tenDangNhap: input.tenDangNhap, matKhau: input.matKhau }, function (error) {
        output.session = error;
    });

    return output;
}

function clearLoginInCookie(response) {
    let output = {};

    response.clearCookie('tenDangNhap');
    response.clearCookie('matKhau');

    return output;
}

function clearLoginInSession(request, response) {
    let output = {};

    request.sessionStore.destroy(request.signedCookies.sessionID, function (error) {
        output.session = error;
    });
    response.clearCookie('sessionID');

    return output;
}

async function checkInputLogin(input) {
    return input.tenDangNhap && input.matKhau && await taikhoanDatabase.exists({ tenDangNhap: input.tenDangNhap, matKhau: input.matKhau });
}

function preprocessLoginInfo(input) {
    if (!input.isHashed) {
        input.matKhau = crypto.createHash('MD5').update(input.matKhau).digest('hex');
    }
    return input;
}

//Get login information
module.exports.get = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        let informationCookie = getLoginInCookie(request);
        let informationSession = await getLoginInSession(request);

        if (informationCookie && informationCookie.tenDangNhap && informationCookie.matKhau) {
            output.cookie = informationCookie;
        }

        if (informationSession && informationSession.tenDangNhap && informationSession.matKhau) {
            output.session = { tenDangNhap: informationSession.tenDangNhap, matKhau: informationSession.matKhau };
        }

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Add new login information
module.exports.post = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};
        let ghiNho = input.ghiNho;

        input = preprocessLoginInfo(input);

        if (checkInputLogin(input)) {
            if (ghiNho) {
                setLoginInCookie(response, input);
                output.cookie = true;
            } else {
                clearLoginInCookie(response);
                output.cookie = false;
            }

            setLoginInSession(request, response, input);
            output.session = true;
        }

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Add new login information if not exists
//Edit login information if exists
module.exports.put = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';

        let informationCookie = getLoginInCookie(request);
        let informationSession = await getLoginInSession(request);

        if (informationCookie && informationCookie.tenDangNhap && informationCookie.matKhau && informationSession && informationSession.tenDangNhap && informationSession.matKhau) {
            module.exports.patch(request, response, next);
        } else {
            module.exports.post(request, response, next);
        }
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Edit login information
module.exports.patch = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};
        let ghiNho = input.ghiNho;

        input = preprocessLoginInfo(input);

        if (checkInputLogin(input)) {
            if (ghiNho) {
                setLoginInCookie(response, input);
                output.cookie = true;
            } else {
                clearLoginInCookie(response);
                output.cookie = false;
            }

            setLoginInSession(request, response, input);
            output.session = true;
        }

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Delete login information
module.exports.delete = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        clearLoginInCookie(response);
        output.cookie = true;

        clearLoginInSession(request, response);
        output.session = true;

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Check login information
module.exports.exists = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        let informationCookie = getLoginInCookie(request)
        let informationSession = await getLoginInSession(request);

        output = {
            cookie: informationCookie && informationCookie.tenDangNhap && informationCookie.matKhau,
            session: informationSession && informationSession.tenDangNhap && informationSession.matKhau,
        };

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

//Check login information
module.exports.autoLogin = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = {};

        let informationCookie = getLoginInCookie(request)
        let informationSession = await getLoginInSession(request);

        let isHaveInCookie = false;
        let isHaveInSession = false;

        if (informationCookie && informationCookie.tenDangNhap && informationCookie.matKhau) {
            isHaveInCookie = true;
        }

        if (informationSession && informationSession.tenDangNhap && informationSession.matKhau) {
            isHaveInSession = true;
        }

        if (isHaveInCookie && !isHaveInSession) {
            if (checkInputLogin(input)) {
                setLoginInSession(request, response, input);
                output.session = true;
            } else {
                return module.exports.delete(request, response, next);
            }
        }

        if (isHaveInSession) {          
            if (checkInputLogin(input)) {
                let ghiNho = input.ghiNho;
                if (ghiNho) {
                    setLoginInCookie(response, input);
                    output.cookie = true;
                }
                else {
                    clearLoginInCookie(response);
                }
            }
        }

        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
