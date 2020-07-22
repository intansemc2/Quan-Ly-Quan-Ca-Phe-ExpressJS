//Import Controllers
const errorController = require('./error.controller');

//Import Databases
const modelDatabase = require('../databases/taikhoan.database');

//Import Models
const TaiKhoan = require('../models/taikhoan');

module.exports.index = async function (request, response, next) {
    try {
        let model = new TaiKhoan(null, "new", "new", TaiKhoan.LOAI_USER);
        let results = await modelDatabase.delete(model);
        response.json(results);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);     
    }
};
