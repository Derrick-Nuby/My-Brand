import { Response, Request } from "express"
import { IArticle } from "../types/article"
import Article from "../models/article"
import dotenv from 'dotenv';
dotenv.config();

const getAllArticles = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const articles: IArticle[] = await Article.find();
        

        if(articles.length === 0 ) {
            res.status(404).json({ message: "There are no currently no articles to view! Thank you for the visit :) "})
        }

        res.status(200).json({ articles })
    } catch (error) {
    throw error
    }
}

const createArticle = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as Pick<IArticle, "image" | "title" | "tags" | "description" | "comments" | "likes">

        const userId = req.userId;
        const lUsername = req.lUsername;

        const article: IArticle = new Article({
            image: body.image,
            title: body.title,
            authorId: userId,
            author: lUsername,
            tags: body.tags,
            description: body.description,
            comments: body.comments,
            likes: body.likes,
        })
  
        const newArticle: IArticle = await article.save()
  
      res
        .status(201)
        .json({ message: "Article created successfully", article: newArticle})

    } catch (error) {
    throw error
    }
}

const getSingleArticle = async (req: Request, res: Response): Promise<any> => {
    try {

        const articleId = req.params.id;
        const singleArticle: IArticle | null = await Article.findOne( { _id: articleId });

        if(!singleArticle) {
            return res.status(404).json({ message: "That article doesn't exist on our database"})
        }

        res.status(200).json({ singleArticle })

    } catch (error) {
    throw error
    }
}

const updateArticle = async (req: Request, res: Response): Promise<any> => {
    try {

        const articleId = req.params.id;
        const updateFields = req.body;

        const updatedArticle: IArticle | null = await Article.findOneAndUpdate( { _id: articleId }, updateFields, { new: true });

        if (!updatedArticle) {
            res.status(404).json({ message: "That article doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Article Updated successfully", updatedArticle })

    } catch (error) {
    throw error
    }
}

const deleteArticle = async (req: Request, res: Response): Promise<any> => {
    try {

        const articleId = req.params.id;

        const deletedArticle: IArticle | null = await Article.findOneAndDelete( { _id: articleId });

        if (!deletedArticle) {
            res.status(404).json({ message: "That article doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Article deleted successfully", deletedArticle })

    } catch (error) {
    throw error
    }
}

export { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle }