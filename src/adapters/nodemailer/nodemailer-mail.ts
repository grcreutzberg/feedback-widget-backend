import nodemailer from 'nodemailer';
import { Mail, SendMailData } from "../mail";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ba2f6d92e7f820",
        pass: "dd7b4c710749f8"
    }
});

export class NodemailerMail implements Mail {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Gustavo Creutzberg <gustavo.creutzberg@gmail.com>',
            subject,
            html: body
        });
    }
}