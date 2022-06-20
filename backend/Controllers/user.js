const User = require('../Models/UserModel');
const catchError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const JwtToken = require('../utils/JwtToken');
const SendMail = require('../utils/SendEmail');
exports.listUsers = catchError( async (req, res, next) => {
    const users = await User.find();
    if (!users) {
        next(new ErrorHandler("No users found", 404));
    }
    res.json({
        status : true,
        users
    });
});

// Register user
exports.registerUser = catchError (async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name : name,
        email : email,
        password : password,
        avatar : {
            public_id : "sdfsjd90",
            url : "xys.com"
        }
    });

    new JwtToken().getToken(res, user, 201, () => {

    });
});

// Login user

exports.loginUser = catchError ( async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    const user = await User.findOne({email : email}).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    
    // isPasswordMatch
    const isPasswordMatch = await user.isPasswordMatch(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    new JwtToken().getToken(res, user, 200, () => {

    });
});

exports.logoutUser = catchError (async (req, res, next) => {
    res.cookie('token', "", {
        httpOnly :true,
        expire : Date.now()
    });
    res.status(200).json({
        status : true, 
        message : "Logged Out successfully"
    });
});

exports.forgotPassword = catchError (async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});
    if (!user) {
        return next(new ErrorHandler("Email not found"));
    }

    const resetToken = await user.getResetPasswordToken();
    user.save({validateBeforeSave : false});

    const resetPasswordLink = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${resetToken}`;
    const sendEmail = await new SendMail().send({
        from : 'nayanrahul.jnv@gmail.com',
        subject : "Password Reset",
        text : `Please change your email by clicking the ${resetPasswordLink}`,
        html : `<h3>Please change your password by clicking the Link <a href="${resetPasswordLink}" >Reset Password</a></h3>`,
        to : ['nayan@yopmail.com', 'nayanit3031@gmail.com']
    });
    res.status(200).json({
        status : "success",
        message : "Reset email shared on your Email",
        token : resetToken
    });
})
