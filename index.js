//Imports liblaries
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

//Import routers
const adminRouters = require('./routers/admin.router');
const userRouters = require('./routers/user.router');
const staffRouters = require('./routers/staff.router');
const loginRouters = require('./routers/login.router');
const infoRouters = require('./routers/info.router');
const errorRouters = require('./routers/error.router');

//DotENV
dotenv.config();

//Configs apps
const app = express();
const port = process.env.SERVER_PORT;

//Setups
app.set('view engine', 'pug');
app.set('views', './views');

//Uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Public folders
app.use(express.static('./publics')); 

//Inline routers
app.get('/', (request, response, next) => {
	response.render('./admins/tong-quat.pug', {title: 'Page'});
	next();  
});

//Assign route to router
app.use('/admin', adminRouters);
app.use('/user', userRouters);
app.use('/staff', staffRouters);
app.use('/login', loginRouters);
app.use('/info', infoRouters);

//Handle other request
app.use(errorRouters);

//Startups
app.listen(port, () => console.log(`Server is starting and listening in port http://localhost:${port}`));
