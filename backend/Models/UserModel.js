const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        maxlength : [30, "Cannot exceed more than 30 charecters"],
        minlength : [4, "Atleast have 4 charecters"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [8, "Atleast required 8 charecters"],
        select : false
    }, 
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : "user"
    },
    resetPasswordToken : String,
    resetPasswordExpires : Date
}, 
{
    timestamps : true
});

userSchema.pre("save", async function(next) {
    // Do not run if password not changed
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Create method in model

userSchema.methods.createJWTToken = async function() {
    return await jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

userSchema.methods.isPasswordMatch = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getResetPasswordToken = async function() {
    // generate token
    const token = crypto.randomBytes(22).toString('hex');
    // Hasing 
    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest('hex');
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; 
    return this.resetPasswordToken;
}
module.exports = mongoose.model('User', userSchema);