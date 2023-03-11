import nodemailer from "nodemailer"
import * as dotenv from "dotenv"

dotenv.config()

class MailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivisionMail(to,link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `${process.env.API_URL} account activation`,
            text: '',
            html:
            `
                <div>
                    <h1>Follow link below to activate your account </h1>
                    <a href="${link}">${link}</a>
                </div>

            `
        })
    }
}

const mailService = new MailService()

export default mailService