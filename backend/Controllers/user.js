const User = require('../Models/UserModel');
const catchError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const JwtToken = require('../utils/JwtToken');
const SendMail = require('../utils/SendEmail');
const catchAsyncError = require('../middleware/catchAsyncError');
const {sendVerificationEmail} = require('../middleware/auth');

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
    user.getCryptoToken('emailVerificationToken', 'emailVerificationExpires');
    await user.save({
        validateBeforeSave : true
    });
    
    const verificationLink = `${req.protocol}://${req.get('host')}/api/v1/user/verify-email/${user.emailVerificationToken}`;
    await sendVerificationEmail(req, res, next, user, verificationLink);
    res.status(200).json({
        status : true,
        message : "A verification email has been shared on your email",
        user
    })
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
    if (!user.email_verified)
    {
        return next(new ErrorHandler("Your email is not verified. Please verify it once.", 401));
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

    const resetToken = await user.getCryptoToken('resetPasswordToken', 'resetPasswordExpires');
    user.save({validateBeforeSave : false});

    const resetPasswordLink = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${resetToken}`;
    try {
        await new SendMail().send({
            from : 'nayanrahul.jnv@gmail.com',
            subject : "Password Reset",
            text : `Please change your email by clicking the ${resetPasswordLink}`,
            html : `<h3>Please change your password by clicking the Link <a href="${resetPasswordLink}" >Reset Password</a></h3>`,
            to : ['nayan@yopmail.com', 'nayanit3031@gmail.com']
        });
        
    } catch (error) {
        this.resetPasswordToken = undefined;
        this.resetPasswordExpires = undefined;
        await user.save({validationBeforeSave : false});    
        next(new ErrorHandler(error.message, 500));     
    }
    res.status(200).json({
        status : "success",
        message : "Reset email shared on your Email",
        token : resetToken
    });
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({
        passwordResetToken : req.params.token,
        resetPasswordExpires : {$gt : Date.now()}
    });
    if(!user) {
        return next(new ErrorHandler("Reset Pasword link is invalid or Expired"));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save();

    new JwtToken().getToken(res, user, 200);
});


// Get User details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({_id : req.user.id});
    if(!user) {
        return next(new ErrorHandler("User not found or you are not logged in", 404));
    }

    res.json({
        status : true,
        user
    });
});

exports.changePassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    console.log(req.body.oldPassword);
    const isPasswordMatch = await user.isPasswordMatch(req.body.oldPassword);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Old password not matched.", 404));
    }
    
    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("New password doesn't matches", 404));
    }
    user.password = req.body.newPassword;
    await user.save();
    new JwtToken().getToken(res, user, 200);
})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    };

    const user = await User.findByIdAndUpdate({_id : req.user.id}, newUserData, {
        new : true, 
        runValidators : true
    });

    res.json({
        status : true, 
        user
    });
});

// Varify Email

exports.verifyEmail = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({
        emailVerificationToken : req.params.token,
        emailVerificationExpires : { $gt : Date.now()}
    });

    if(!user) {
        return next( new ErrorHandler("Email Verification Link has been expired. Please try again", 401));
    }
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.email_verified = true;
    await user.save({
        validateBeforeSave : false
    })
    new JwtToken().getToken(res, user, 200);
});

// Send verification link

exports.verificationLink = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({
        email : req.body.email,
    });

    if(!user)
    {
        return next(new ErrorHandler("Invalid User", 404));
    }
    console.log(user.email_verified);
    if(user.email_verified)
    {
        return next(new ErrorHandler("Email Already verified", 404));
    }

    user.getCryptoToken('emailVerificationToken', 'emailVerificationExpires');
    await user.save({
        validateBeforeSave : false,
        new : true
    });
    
    const verificationLink = `${req.protocol}://${req.get('host')}/api/v1/user/verify-email/${user.emailVerificationToken}`;
    await sendVerificationEmail(req, res, next, user, verificationLink);
    res.status(200).json({
        status : true,
        message : "A verification link has been shared on your registered email"
    });
});

// Admin Routes

// List all users
exports.listUsers = catchError( async (req, res, next) => {
    const users = await User.find();
    if (!users) {
        return next(new ErrorHandler("No users found", 404));
    }
    res.json({
        status : true,
        users
    });
});

// Get Single User

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        status : true, 
        user
    });
});


// Update Role
exports.updateRole = catchAsyncError(async (req, res, next) => {
    let user = await User.findById(req.body.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    user.role = req.body.role;
    user = await user.save({
        validateBeforeSave : false,
        new : true
    });
    res.status(200).json({
        status : true,
        message : "User role updated successfully",
        user
    });
})

