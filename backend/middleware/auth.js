const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const SendEmail = require('../utils/SendEmail');

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    if (!req.cookies.token) {
        return next(new ErrorHandler("Unauthorised user", 401));
    }
    decodedData = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authoriseRole = (...roles) =>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler("You are not authorised for this action"));
        }
        return next();
    }
};

exports.sendVerificationEmail = async (req, res, next, user, verificationLink) => {
    const sendEmail = new SendEmail();
    try {
        sendEmail.send({
            from : process.env.SMTP_EMAIL,
            to : [user.email],
            subject : "Verification Email",
            html : `<h3>This is regarding the email verification. Please click link </h3> <a href="${verificationLink}" />Varify</a>`
        });
        return next();
    }
    catch(e)
    {
        console.log(e);
        next(new ErrorHandler(e.message, 500));
    }

}

