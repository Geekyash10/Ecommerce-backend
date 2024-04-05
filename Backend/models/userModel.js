const mongoose = require('mongoose');
const validator = require('validator'); // validation check karne ke liye
const bcrypt = require('bcryptjs'); // paswword ko hash karne ke liye
const jwt = require('jsonwebtoken'); // token generate karne ke liye
const crypto = require('crypto') // for reseting the password
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please emter your name"],
        maxLength: [30, "name cannot exceed 30 characters"],
        minLength: [4, "name atleast of four characters"]
    },
    email: {
        type: String,
        required: [true, "please emter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "please emter your password"],
        minLength: [8, "password atleast of eight characters"],
        select: false
    },
    avtar: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    }, // yre aise hi hota hai
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})
userSchema.pre("save", async function (next) // hmm callback(matlab ()=>) me this use nahi kar sakte isliye
{
    if (!this.isModified("password")) { // agar user aaya update karne ke liye condition
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

})
//JWT TOKEN // register karte hi login hijana no that you have to again login in that
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generating Password reset token
userSchema.methods.getResetPasswordToken = function () {
    // generating token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // set token expire time
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // (min+sec+millisec)
    return resetToken;
}
module.exports = mongoose.model('User', userSchema)