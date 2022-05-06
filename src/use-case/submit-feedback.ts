import { Mail } from "../adapters/mail";
import { Feedback } from "../models/feedback";

interface SubmitFeedbackRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedback {
    constructor(
        private feedback: Feedback,
        private mail: Mail
    ) {}

    async execute(request: SubmitFeedbackRequest) {
        const { type, comment, screenshot } = request;
        await this.feedback.create({ 
            type, 
            comment, 
            screenshot 
        });

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        }

        await this.mail.sendMail({
            subject: 'New feedback from Feedget',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px;'color: #111;">`,
                `<h1>New feedback from Feedget</h1>`,
                `<p>Type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`,
                `<div style="width:480px; height:654px;">`,
                `${screenshot ? `<img src="${screenshot}" />` : ''}`,
                `</div>`,
                `</div>`
            ].join('\n')
        })
    }
}