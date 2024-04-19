import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Article from '../models/article.js';
import { IArticle } from "../types/article.js"
import dotenv from 'dotenv';
dotenv.config();

const sendLatestArticle = async (emails: string[], latestArticle: IArticle): Promise<void> => {
    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.mailHost,
            port: 465,
            secure: true,
            auth: {
                user: process.env.adminEmail,
                pass: process.env.adminPass,
            },
        });

        // Email options template
        const mailOptionsTemplate = {
            from: process.env.adminEmail,
            subject: `Latest Article: ${latestArticle.title}`,
            text: `Here's the latest article:\n\nTitle: ${latestArticle.title}\n\nDescription: ${latestArticle.description}\n\nTimestamp: ${latestArticle.timestamp}`,
        };

        // Iterate over each email and send the article
        for (const email of emails) {
            const mailOptions = {
                ...mailOptionsTemplate,
                to: email,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}:`, `Subject: ${mailOptions.subject}`);
        }

    } catch (error) {
        console.error('Error sending latest article email:', error);
        throw error;
    }
};



export { sendLatestArticle };
