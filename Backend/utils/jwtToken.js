// create token save in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}
// get jwttoken usermodel me bna rakha hai
// waha se direct token mil raha hai register karne pe
// usko cookie me save kar diya

module.exports = sendToken;