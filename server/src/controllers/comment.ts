import { Response, Request } from "express"
import { IComment } from "../types/comment.js"
import Comment from "../models/comment.js"
import dotenv from 'dotenv';
dotenv.config();

const getAllComments = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const comments: IComment[] = await Comment.find();
        

        if(comments.length === 0 ) {
            res.status(404).json({ message: "There are no currently no comments to view! Thank you for the visit :) "})
        }

        res.status(200).json({ comments })
    } catch (error) {
    throw error
    }
}

const createComment = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as Pick<IComment, "blogId" | "content">

        const userId = req.userId;
        const lUsername = req.lUsername;

        const comment: IComment = new Comment({
            authorId: userId,
            authorName: lUsername,
            blogId: body.blogId,
            content: body.content,
        })

        const newComment: IComment = await comment.save()
  
      res
        .status(201)
        .json({ message: "Comment created successfully", Comment: newComment})

    } catch (error) {
    throw error
    }
}

const getSingleComment = async (req: Request, res: Response): Promise<any> => {
    try {

        const CommentId = req.params.id;
        const singleComment: IComment | null = await Comment.findOne( { _id: CommentId });

        if(!singleComment) {
            res.status(404).json({ message: "That Comment doesn't exist on our database"})
        }

        res.status(200).json({ singleComment })

    } catch (error) {
    throw error
    }
}

const updateComment = async (req: Request, res: Response): Promise<any> => {
    try {

        const CommentId = req.params.id;
        const updateFields = req.body;

        const updatedComment: IComment | null = await Comment.findOneAndUpdate( { _id: CommentId }, updateFields, { new: true });

        if (!updatedComment) {
            res.status(404).json({ message: "That Comment doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Comment Updated successfully", updatedComment })

    } catch (error) {
    throw error
    }
}

const deleteComment = async (req: Request, res: Response): Promise<any> => {
    try {

        const CommentId = req.params.id;

        const deletedComment: IComment | null = await Comment.findOneAndDelete( { _id: CommentId });

        if (!deletedComment) {
            res.status(404).json({ message: "That Comment doesn't exist in our database" });
            return;
        }

        res.status(200).json({ message: "Comment deleted successfully", deletedComment })

    } catch (error) {
    throw error
    }
}

export { getAllComments, createComment, getSingleComment, updateComment, deleteComment }