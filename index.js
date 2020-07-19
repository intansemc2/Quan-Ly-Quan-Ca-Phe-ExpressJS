//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

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

//Routers
app.get('/', (request, response, next) => {
	response.render('./admins/tong-quat.pug', {title: 'Page'});
	next();
});

//Startups
app.listen(port, () => console.log(`Server is starting and listening in port http://localhost:${port}`));
