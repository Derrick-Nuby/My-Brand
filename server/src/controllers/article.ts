import { Response, Request, NextFunction  } from "express"
import { IArticle } from "../types/article.js"
import Article from "../models/article.js"
import { sendLatestArticle } from "./sendmessage.js"
import { IUser } from "../types/user.js"
import User from "../models/user.js"
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});


const getAllArticles = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const articles: IArticle[] = await Article.find();
        

        if(articles.length === 0 ) {
            res.status(404).json({ message: "There are currently no articles to view! Thank you for the visit :) "})
            return;
        }

        res.status(200).json({ articles })
    } catch (error) {
    throw error
    }
}

const createArticle = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as Pick<IArticle, "title" | "tags" | "description">

        const userId = req.userId;
        const lUsername = req.lUsername;

        if (!req.file) {
            return res.status(400).json({ error: "Image file is missing" });
        }

        const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'brandImages' });


        const article: IArticle = new Article({
            image: cloudinaryResponse.secure_url,
            title: body.title,
            authorId: userId,
            author: lUsername,
            tags: body.tags,
            description: body.description,
        })

        const newArticle: IArticle = await article.save()

    res
        .status(201)
        .json({ message: "Article created successfully", article: newArticle})

        const users = await User.find();
        const emails = users.map(user => user.email);
        await sendLatestArticle(emails, newArticle);
        
        // const recipientEmail = 'iradukundaderrick7@gmail.com';
        // await sendLatestArticle(recipientEmail, newArticle);
        
        // next();
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getSingleArticle = async (req: Request, res: Response): Promise<any> => {
    try {

        const articleId = req.params.id;
        const singleArticle: IArticle | null = await Article.findOne( { _id: articleId });

        if(!singleArticle) {
            return res.status(404).json({ error: "That article doesn't exist on our database"})
        }

        res.status(200).json({ singleArticle })

    } catch (error) {
    throw error
    }
}

const updateArticle = async (req: Request, res: Response): Promise<any> => {
    try {
        const articleId = req.params.id;

        const existingArticle: IArticle | null = await Article.findById(articleId);

        if (!existingArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        const updates: Partial<IArticle> = {};

        if (req.file) {
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'brandImages'
            });
            updates.image = cloudinaryResponse.secure_url;
        }

        const { title, description } = req.body as Pick<IArticle, 'title' | 'description'>;

        if (title !== undefined) {
            updates.title = title;
        }

        if (description !== undefined) {
            updates.description = description;
        }

        const updatedArticle: IArticle | null = await Article.findByIdAndUpdate(articleId, updates, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.status(200).json({ message: "Article updated successfully", article: updatedArticle });

    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteArticle = async (req: Request, res: Response): Promise<any> => {
    try {

        const articleId = req.params.id;

        const deletedArticle: IArticle | null = await Article.findOneAndDelete( { _id: articleId });

        if (!deletedArticle) {
            res.status(404).json({ error: "That article doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Article deleted successfully", deletedArticle })

    } catch (error) {
    throw error
    }
}



export { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle }