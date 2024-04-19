import Article from "../models/article.js";
import { sendLatestArticle } from "./sendmessage.js";
import dotenv from 'dotenv';
dotenv.config();
import cloudinary from 'cloudinary';
cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        if (articles.length === 0) {
            res.status(404).json({ message: "There are currently no articles to view! Thank you for the visit :) " });
            return;
        }
        res.status(200).json({ articles });
    }
    catch (error) {
        throw error;
    }
};
const createArticle = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId;
        const lUsername = req.lUsername;
        if (!req.file) {
            return res.status(400).json({ error: "Image file is missing" });
        }
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'brandImages' });
        const article = new Article({
            image: cloudinaryResponse.secure_url,
            title: body.title,
            authorId: userId,
            author: lUsername,
            tags: body.tags,
            description: body.description,
        });
        const newArticle = await article.save();
        res
            .status(201)
            .json({ message: "Article created successfully", article: newArticle });
        const recipientEmail = 'iradukundaderrick7@gmail.com';
        await sendLatestArticle(recipientEmail, newArticle);
        // next();
    }
    catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getSingleArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const singleArticle = await Article.findOne({ _id: articleId });
        if (!singleArticle) {
            return res.status(404).json({ error: "That article doesn't exist on our database" });
        }
        res.status(200).json({ singleArticle });
    }
    catch (error) {
        throw error;
    }
};
const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const existingArticle = await Article.findById(articleId);
        if (!existingArticle) {
            return res.status(404).json({ error: "Article not found" });
        }
        const updates = {};
        if (req.file) {
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'brandImages'
            });
            updates.image = cloudinaryResponse.secure_url;
        }
        const { title, description } = req.body;
        if (title !== undefined) {
            updates.title = title;
        }
        if (description !== undefined) {
            updates.description = description;
        }
        const updatedArticle = await Article.findByIdAndUpdate(articleId, updates, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ error: "Article not found" });
        }
        res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
    }
    catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const deletedArticle = await Article.findOneAndDelete({ _id: articleId });
        if (!deletedArticle) {
            res.status(404).json({ error: "That article doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Article deleted successfully", deletedArticle });
    }
    catch (error) {
        throw error;
    }
};
export { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle };
//# sourceMappingURL=article.js.map