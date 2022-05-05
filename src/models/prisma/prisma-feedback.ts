import { prisma } from "../../prisma";
import { Feedback, FeedbackData } from "../feedback";

export class PrismaFeedback implements Feedback {
    async create({ type, comment, screenshot }: FeedbackData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    };
}