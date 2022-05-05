import express from 'express';
import { NodemailerMail } from './adapters/nodemailer/nodemailer-mail';
import { PrismaFeedback } from './models/prisma/prisma-feedback';
import { SubmitFeedback } from './use-case/submit-feedback';

export const routes = express.Router();

routes.post('/feedback', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedback = new PrismaFeedback();
    const nodemailerMail = new NodemailerMail();

    const submitFeedback = new SubmitFeedback(
        prismaFeedback,
        nodemailerMail
    );

    await submitFeedback.execute({
        type,
        comment,
        screenshot
    });
    return res.status(201).send('OK');
});