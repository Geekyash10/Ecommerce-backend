const ErrorHandler = require("../utils/errorhandler");
const cathAsyncErrors = require("./cathAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
exports.isAuthenticatedUser = cathAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies; // token banate waqt cookie me save kar liya tha token
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id)
    next();
})
exports.isAuthorizerRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { // req.user me saara data save kar liya tha uper
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}