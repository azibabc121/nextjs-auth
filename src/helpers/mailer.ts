import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptJs from 'bcryptjs'

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptJs.hash(userId.toString(), 10) // Used bcrypt js to avoid another library - But the better option for this case is uuid
        
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            )
        } else if (emailType === "RESET") {
            const hashedToken = await bcryptJs.hash(userId.toString(), 10)

            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000 }
            )
        }

        const transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: "fcb939638c6a1e95d9b4de1545149127"
            }
        });

        const mailOptions = {
            from: 'azibabc21@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in the browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}