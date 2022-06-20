const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Wrong mongodb id error 
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message, 500);
    }
    if(err.code = 1100)
    {
        console.log(err);
        const message = `Dupplicate key error. Duplicate : ${err}`;
        err = new ErrorHandler(message, 500);
    }
    res.status(err.statusCode).json({
        success : false,
        message : (process.env.BUILD === 'dev') ? err.stack : err.message
    })
}