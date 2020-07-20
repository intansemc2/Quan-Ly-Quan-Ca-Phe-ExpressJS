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

//Handle other request
app.use(function(req, res, next){
	//Set request status
	res.status(404);
  
	//Respond with html page
	if (req.accepts('html')) {
	  res.render('errors/404', { url: req.url });
	  return;
	}
  
	//Respond with json
	if (req.accepts('json')) {
	  res.send({ error: {code: 404, message: 'Not found'} });
	  return;
	}
  
	//Default to plain-text. send()
	res.type('txt').send('404: Not found');

	//Call next
	next();
  });

// Handle any error
app.use(function(err, req, res, next) {
	res.status(500);

	//Respond with html page
	if (req.accepts('html')) {
		res.render('errors/500', { url: req.url, error: err });
		return;
	}

	//Respond with json
	if (req.accepts('json')) {
	res.send({ error: {code: 500, message: 'Internal Server Error'} });
	return;
	}

	//Default to plain-text. send()
	res.type('txt').send('500: Internal Server Error');

	//Call next
	next();
  });

//Startups
app.listen(port, () => console.log(`Server is starting and listening in port http://localhost:${port}`));
