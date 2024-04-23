import nodemailer from "nodemailer"
import * as dotenv from "dotenv"
import { createContainer , asValue } from "awilix"

dotenv.config()

//Factory pattern implemented here in order to simplify the process of creating different types of mails using one interface class
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

    async sendMail(to, subject, html) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text: '',
            html
        });
    }

}
//Child classes representing different types of mails
export class ActivationMailService extends MailService {
    constructor(to, link) {
        super();
        this.to = to;
        this.link = link;
        this.subject = `${process.env.API_URL} account activation`;
        this.html = `
            <div>
                <h1>Follow link below to activate your account </h1>
                <a href="${this.link}">${this.link}</a>
            </div>
        `;
    }
}

export class ResetPasswordMailService extends MailService {
    constructor(to, link) {
        super();
        this.to = to;
        this.link = link;
        this.subject = `Reset password for your Serene Jerney account`;
        this.html = `
            <div>
                <h1>Follow link below to reset your password </h1>
                <a href="${this.link}">${this.link}</a>
            </div>
        `;
    }
}
//Factory class that will be used to create different types of mails (interface)
export class MailFactory {
    createMail(type, to, link) {
        switch (type) {
            case 'activation':
                return new ActivationMailService(to, link);
            case 'reset':
                return new ResetPasswordMailService(to, link);
            default:
                throw new Error('Invalid mail type');
        }
    }
}

const mailServiceContainer = createContainer()

const mailService = new MailFactory()

mailServiceContainer.register({mailService: asValue(mailService)});


export default mailServiceContainer