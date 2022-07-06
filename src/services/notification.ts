import * as dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import fast2sms from "fast-two-sms";
import { HTTPErrorHandler } from '../services/errorHandler';

export class Notification {
    errorObj: any
    constructor() {
        this.errorObj = new HTTPErrorHandler()
    }
    async sendEmail(email, body, subject) {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_ID,
                    pass: process.env.GMAIL_PASSWORD
                }
            });
            var mailOptions = {
                from: process.env.GMAIL_ID,
                to: process.env.RECEIVER_ID,
                subject: subject,
                html: body
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(info);
                }
            });
        } catch {
            throw this.errorObj.businessValidationError(400, "Cannot send email");
        }
    }

    async sendSms({ message, mobileNumber}) {
        try {
            var options = { 
                authorization: process.env.FAST2SMS_KEY, 
                message,
                numbers: [mobileNumber]   
            }
            fast2sms.sendSms(options)
        } catch {
            throw this.errorObj.businessValidationError(400, "Cannot send OTP");
        }
    };
}
export default {
    Notification,
};