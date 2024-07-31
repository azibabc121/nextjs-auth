import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        requred: [true, "Please provide a username"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: string,
        requred: [true, "Please provide a email"],
        unique: [true, "Username must be email"]
    },
    password: {
        type: string,
        requred: [true, "Please provide a password"],
    },
    isVerified: {
        type: boolean,
        default: false
    },
    isAdmin: {
        type: boolean,
        default: false
    },
    forgotPasswordToken: string,
    forgotPasswordExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
}, { timestamps });

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User