//Imports liblaries
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

//Import routers
const adminRouters = require('./routers/admin.router');
const userRouters = require('./routers/user.router');
const staffRouters = require('./routers/staff.router');
const accountManagerRouters = require('./routers/account.manager.router');
const apiRouters = require('./routers/api.router');
const errorRouters = require('./routers/error.router');

//DotENV
dotenv.config();

//Configs apps
const app = express();
const port = process.env.SERVER_PORT || 3000;

//Setups
app.set('view engine', 'pug');
app.set('views', './views');

//Uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cookie
app.use(cookieParser(process.env.COOKIES_SECURE));

//Session
const sessionConnection = mysql.createConnection({ host: process.env.DATABASE_HOST || 'localhost', user: process.env.DATABASE_USER || 'root', password: process.env.DATABASE_PASS || '', database: process.env.DATABASE_NAME || 'quanlyquancaphe' });

const SESSION_OPTIONS = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    clearExpired: true,
    checkExpirationInterval: 60 * 1000 /* 1 minutes */,
    expiration: 15 * 60 * 1000 /* 15 minutes */,
    // createDatabaseTable: true,
    // connectionLimit: 1,
    schema: {
        tableName: 'sessionInformation',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    },
};

const sessionStore = new MySQLStore(SESSION_OPTIONS, sessionConnection);

app.use(
    session({
        cookie: { sameSite: 'Lax', maxAge: 24 * 3600 * 1000 /* 24 hours */, httpOnly: true, signed: true },
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);

//Public folders
app.use(express.static('./publics'));

//Inline routers
app.get('/', (request, response, next) => {
    response.redirect('/user');
    next();
});

//Assign route to router
app.use('/admin', adminRouters);
app.use('/user', userRouters);
app.use('/staff', staffRouters);
app.use('/account.manager', accountManagerRouters);
app.use('/api', apiRouters);

//Handle other request
app.use(errorRouters);

//Startups
app.listen(port, () => console.log(`Server is starting and listening in port http://localhost:${port}`));
