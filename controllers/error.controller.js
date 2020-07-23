module.exports = {
    handle404: (request, response, next) => {
        //Check if header sent or not
        if(response.headersSent) { return; }

        //Set request status
        response.status(404);

        //Respond with html page
        if (request.accepts('html')) {
            response.render('errors/404', { url: request.url });
            return;
        }

        //Respond with json
        if (request.accepts('json')) {
            response.send({ error: {code: 404, message: 'Not found'} });
            return;
        }

        //Default to plain-text. send()
        response.type('txt').send('404: Not found');

        //Call next
        next();
    },
    handle500: (error, request, response, next) => {
        //Check if header sent or not 
        if(response.headersSent) { return; }

        //Set request status
        response.status(500);

        //Respond with html page
        if (request.accepts('html')) {
            response.render('errors/500', { url: request.url, error: error });
            return;
        }

        //Respond with json
        if (request.accepts('json')) {
            response.send({ error: {code: 500, message: `Internal Server Error`, detail: `${error}`} });
            return;
        }

        //Default to plain-text. send()
        response.type('txt').send(`Error 500: Internal Server Error, ${error}`);

        //Call next
        next();
    }
};