import Comment from "../models/comment.js";
import dotenv from 'dotenv';
dotenv.config();
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        if (comments.length === 0) {
            return res.status(404).json({ message: "There are no currently no comments to view! Thank you for the visit :) " });
        }
        return res.status(200).json({ comments });
    }
    catch (error) {
        throw error;
    }
};
const createComment = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId;
        const lUsername = req.lUsername;
        const comment = new Comment({
            authorId: userId,
            authorName: lUsername,
            blogId: body.blogId,
            content: body.content,
        });
        const newComment = await comment.save();
        res
            .status(201)
            .json({ message: "Comment created successfully", Comment: newComment });
    }
    catch (error) {
        throw error;
    }
};
const getSingleComment = async (req, res) => {
    try {
        const CommentId = req.params.id;
        const singleComment = await Comment.findOne({ _id: CommentId });
        if (!singleComment) {
            res.status(404).json({ message: "That Comment doesn't exist on our database" });
        }
        res.status(200).json({ singleComment });
    }
    catch (error) {
        throw error;
    }
};
const getPostsComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ blogId: blogId });
        if (comments.length === 0) {
            return res.status(404).json({ message: "There are no currently no comments to view! Thank you for the visit :) " });
        }
        return res.status(200).json({ comments });
    }
    catch (error) {
        throw error;
    }
};
const updateComment = async (req, res) => {
    try {
        const CommentId = req.params.id;
        const userId = req.userId;
        const updateFields = req.body;
        const comment = await Comment.findById(CommentId);
        if (!comment) {
            res.status(404).json({ error: "That Comment doesn't exist in our database" });
            return;
        }
        if (comment.authorId.toString() !== userId) {
            res.status(403).json({ error: "You do not own that comment and therefore cannot edit or change it." });
            return;
        }
        const updatedComment = await Comment.findOneAndUpdate({ _id: CommentId }, updateFields, { new: true });
        res.status(200).json({ message: "Comment Updated successfully", updatedComment });
    }
    catch (error) {
        throw error;
    }
};
const deleteComment = async (req, res) => {
    try {
        const CommentId = req.params.id;
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        const comment = await Comment.findById(CommentId);
        console.log(isAdmin);
        if (!comment) {
            res.status(404).json({ error: "That Comment doesn't exist in our database" });
            return;
        }
        if (comment.authorId.toString() !== userId || isAdmin != true) {
            res.status(403).json({ error: "You do not own that comment and therefore cannot delete it." });
            return;
        }
        const deletedComment = await Comment.findOneAndDelete({ _id: CommentId });
        res.status(200).json({ message: "Comment deleted successfully", deletedComment });
    }
    catch (error) {
        throw error;
    }
};
export { getAllComments, createComment, getSingleComment, updateComment, deleteComment, getPostsComment };
//# sourceMappingURL=comment.js.map