import nodemailer from 'nodemailer';
import Article from '../models/article.js';
import dotenv from 'dotenv';
dotenv.config();
const sendLatestArticle = async (recipientEmail, latestArticle) => {
    try {
        // Fetch the latest article if it wasn't passed as an argument
        let article;
        if (latestArticle) {
            article = latestArticle;
        }
        else {
            const articles = await Article.find().sort({ timestamp: -1 }).limit(1);
            article = articles[0];
        }
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
        // Email options
        const mailOptions = {
            from: process.env.adminEmail,
            to: recipientEmail,
            subject: `Latest Article: ${article.title}`,
            text: `Here's the latest article:\n\nTitle: ${article.title}\n\nContent: ${article.description}\n\nTimestamp: ${article.timestamp}`, // Include article details in the email body
        };
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipientEmail}:`, `Subject: ${mailOptions.subject}`);
    }
    catch (error) {
        console.error('Error sending latest article email:', error);
        throw error;
    }
};
export { sendLatestArticle };
//# sourceMappingURL=sendmessage.js.map