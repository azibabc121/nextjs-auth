import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from 'next/server';
import bcryptJs from 'bcryptjs'
import { sendMail } from "@/helpers/mailer";

connectDb()

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
        return NextResponse.json({ error: "All the fields are required" }, { status: 404 })
    }
    try {
        // validation
        console.log(reqBody);

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptJs.genSalt(10)
        const hashedPassword = await bcryptJs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        console.log(savedUser);

        // Send verification email 
        await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}