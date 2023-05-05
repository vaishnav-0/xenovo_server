/**
 * 
 * Error Handling middleware, catches errors, sends appropriate HTTP response
 * logs error message 
 * 
 */

const logger = require('./winston');

const errorHandler = (err, req, res, next) => {
    let response = {};
    let code = parseInt(err.code, 10) || 500;

	console.log(err);

    if (err.name === 'APIError' ) {
        response = {
            message: err.message,
        };
    } else {
        response = {
            message: 'Something went wrong.',
        };
    }

    res.status(code);

    res.json({
        error: response,
    });


    const message = `${req.method || ''} ${req.url || ''} ${err.message}`;
    logger.error(message);
}


module.exports = errorHandler;
