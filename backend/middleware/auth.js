const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const isAuthencated = catchAsyncError(async (req, res, next) => {
    if (!req.cookies.token) {
        return next(new ErrorHandler("Unauthorised user", 401));
    }
    decodedData = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

module.exports = isAuthencated;
