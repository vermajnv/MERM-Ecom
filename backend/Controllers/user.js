const User = require('../Models/UserModel');
const catchError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

exports.listUsers = catchError( async (req, res, next) => {
    res.json({
        status : true,
        message : "Listing users"
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

    const jwtToken = await user.createJWTToken();
    res.json({
        status : true,
        message : "User Created successfully",
        user,
        jwtToken
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

    const jwtToken = await user.createJWTToken()
    res.json({
        status : 200,
        jwtToken
    });
})
