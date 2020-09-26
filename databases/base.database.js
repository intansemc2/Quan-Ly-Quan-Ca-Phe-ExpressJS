const mysql = require('mysql');

module.exports.createConnection = function (host = process.env.DATABASE_HOST || 'localhost', user = process.env.DATABASE_USER || 'root', password = process.env.DATABASE_PASS || '', database = process.env.DATABASE_NAME || 'quanlyquancaphe') {
    return mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
    });
};

module.exports.get = function (input, createQueryGet, converResultGet) {
    let query = createQueryGet(input);
    return new Promise(function (reslove, reject) {
        //Post configs
        const connection = module.exports.createConnection();

        //Open connection
        connection.connect();

        //Result
        let models = [];

        //Queries
        connection.query(query, function (error, results, fields) {
            //Handle error
            if (error) {
                connection.end();
                reject(error);
                return;
            }

            //Get and parse Result
            for (let result of results) {
                models.push(converResultGet(result));
            }

            //Handle finish
            connection.end();
            reslove(models);
        });
    });
};

module.exports.post = function (input, createQueryPost) {
    let query = createQueryPost(input);
    return new Promise(function (reslove, reject) {
        //Post configs
        const connection = module.exports.createConnection();

        //Open connection
        connection.connect();

        //Queries
        connection.query(query, function (error, results, fields) {
            //Handle error
            if (error) {
                connection.end();
                reject(error);
                return;
            }

            //Handle finish
            connection.end();
            reslove(results.insertId);
        });
    });
};

module.exports.patch = function (input, createQueryPatch) {
    let query = createQueryPatch(input);
    return new Promise(function (reslove, reject) {
        //Post configs
        const connection = module.exports.createConnection();

        //Open connection
        connection.connect();

        //Queries
        connection.query(query, function (error, results, fields) {
            //Handle error
            if (error) {
                connection.end();
                reject(error);
                return;
            }

            //Handle finish
            connection.end();
            reslove(results.affectedRows);
        });
    });
};

module.exports.delete = function (input, createQueryDelete) {
    let query = createQueryDelete(input);
    return new Promise(function (reslove, reject) {
        //Post configs
        const connection = module.exports.createConnection();

        //Open connection
        connection.connect();

        //Queries
        connection.query(query, function (error, results, fields) {
            //Handle error
            if (error) {
                connection.end();
                reject(error);
                return;
            }

            //Handle finish
            connection.end();
            reslove(results.affectedRows);
        });
    });
};

module.exports.exists = function (input, createQueryExists, isPrimarykeyOnly = false) {
    let query = createQueryExists(input, isPrimarykeyOnly);
    return new Promise(function (reslove, reject) {
        //Post configs
        const connection = module.exports.createConnection();

        //Open connection
        connection.connect();

        //Queries
        connection.query(query, function (error, results, fields) {
            //Handle error
            if (error) {
                connection.end();
                reject(error);
                return;
            }

            //Handle finish
            connection.end();
            reslove(results[0].NUMBER_ROWS);
        });
    });
};

module.exports.put = async function (input, createQueryExists, createQueryPatch, createQueryPost) {
    let isExists = await module.exports.exists(input, createQueryExists, true);
    let result = undefined;
    if (isExists) {
        result = await module.exports.patch(input, createQueryPatch);
    } else {
        result = await module.exports.post(input, createQueryPost);
    }
    return result;
};
