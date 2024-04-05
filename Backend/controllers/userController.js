const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/cathAsyncErrors.js')
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken.js');
const sendEmail = require('../utils/sendEmail.js');
//register A user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avtar: {
            public_id: "public_id",
            url: "url"
        }
    })
    sendToken(user, 201, res);
})
// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler('please enter email and password', 400))
    }
    const user = await User.findOne({ email }).select("+password") // password isliye direct nahi likha kyuki model me select false tha
    if (!user) {
        return next(new ErrorHandler('invalid user or password', 401))
    }
    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('invalid user or password', 401))
    }
    sendToken(user, 200, res);
})

//logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "logged out"
    })
})
//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('user not found with this email', 404))
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false }); // isme save usliye use kiya kyuki iss function me save nahi hua tha
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\n if you have not requested this email then ignore it`
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password recovery`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500)) // agar error aagaya toh use undefined karna padega kyuki hmmnen use save kar liya tha
    }
})
//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex'); // uper se token uthaya url se fir usse hash karna padega kyuki databse me user ko hash token save kiya tha
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler('password reset token is invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('password does not match', 400))
    }
    //setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res); // login karne ke liye token send kar diya
})
// get user detail
exports.getDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id); // login wale function me jaake dekhega toh pta chalega user me uska saara data save kar diya tha
    res.status(200).json({
        success: true,
        user
    })
})
//update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('old password is incorrect', 400))
    }
    if (req.body.newpassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('password does not match', 400))
    }
    user.password = req.body.newpassword;
    await user.save();
    sendToken(user, 200, res);
}
)
// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        usefindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})
// get all users(Admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})
// get one user(Admin)
exports.getOneUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne(req.params.id);
    if (!user) {
        return next(new Errorhandler('user not found', 404))
    }
    res.status(200).json({
        success: true,
        user
    })
})
// update user role(Admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        usefindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})
// delete user(Admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('user not found', 404))
    }
    await user.remove();

    res.status(200).json({
        success: true,
        message: "user delete successfully"
    })
})
// naam se hi samaj aa raha hai saare function user se related control ke liye 
// crypto .randombytes(20).tostring('hex') ye random token generate karne ke liye use hota hai
// phele toh ye buffer value deta tha but humne hex me convert kar diya\
// hash kar diya usko sha256 se
// digest kar diya hex me
// digest means convert kar diya string me 