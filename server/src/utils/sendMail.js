import nodeMailer from 'nodemailer'
import { asyncHandler } from '../errors/asynHandler.js'

export const sendMail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host : 'smpt.gmail.com',
        port : 465,
        service : process.env.SMPT_SERVICE,
        auth : {
            user : process.env.SMPT_EMAIL,
            pass : process.env.SMPT_PASSWORD
        }
    })
    const mailOptions = ({
        from : process.env.SMPT_EMAIL,
        to : options.email,
        subject : options.subject,
        text : options.message

    })

    await transporter.sendMail(mailOptions)
}