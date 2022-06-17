class JwtToken {
    async getToken(res, user, statusCode) {
        const jwtToken = await user.createJWTToken();

        //Set cookie options
        const options = {
            expire : new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly : true
        }
        res.status(statusCode).cookie('token', jwtToken, options).json({
            status : true,
            user,
            jwtToken
        });
    }
}

module.exports = JwtToken;