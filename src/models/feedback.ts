export interface FeedbackData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface Feedback {
    create: (data: FeedbackData) => Promise<void>;
}