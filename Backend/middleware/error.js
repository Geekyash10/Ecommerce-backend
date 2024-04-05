const ErrorHandler = require('../utils/errorhandler')
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    //wrong mongodb id error
    if (err.name === "CastError") {
        const message = `resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `json web token is invalid. Try Again!!!`;
        err = new ErrorHandler(message, 400);
    }
    // jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = `json web token is expired. Try Again!!!`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        error: err.stack,
        message: err.message
    })
}