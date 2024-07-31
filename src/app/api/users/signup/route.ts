import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from 'next/server';

connectDb()

export async function Post(request: NextRequest) {
    try {
        const reqBody = request.json();
        const { userName, email, password } = reqBody;
        // validation
        console.log(reqBody);

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}