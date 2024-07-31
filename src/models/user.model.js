import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requred: [true, "Please provide a username"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "Username must be email"]
    },
    password: {
        type: String,
        requred: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User