import Reply from "../models/reply.js";
import dotenv from 'dotenv';
dotenv.config();
const getAllReplies = async (req, res) => {
    try {
        const replies = await Reply.find();
        // if(replies.length === 0 ) {
        //     return res.status(404).json({ message: "There are no currently no replies to view! Thank you for the visit :) "})
        // }
        return res.status(200).json({ replies });
    }
    catch (error) {
        throw error;
    }
};
const createReply = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId;
        const lUsername = req.lUsername;
        const reply = new Reply({
            authorId: userId,
            authorName: lUsername,
            parentId: body.parentId,
            blogId: body.blogId,
            content: body.content,
        });
        const newReply = await reply.save();
        res
            .status(201)
            .json({ message: "Reply created successfully", Reply: newReply });
    }
    catch (error) {
        throw error;
    }
};
const getSingleReply = async (req, res) => {
    try {
        const ReplyId = req.params.id;
        const singleReply = await Reply.findOne({ _id: ReplyId });
        if (!singleReply) {
            res.status(404).json({ error: "That Reply doesn't exist on our database" });
        }
        res.status(200).json({ singleReply });
    }
    catch (error) {
        throw error;
    }
};
const getCommentReplies = async (req, res) => {
    try {
        const commentId = req.params.id;
        const replies = await Reply.find({ parentId: commentId });
        // if(replies.length === 0 ) {
        //     return res.status(404).json({ error: "There are no currently no replies to view! Thank you for the visit :) "})
        // }
        return res.status(200).json({ replies });
    }
    catch (error) {
        throw error;
    }
};
const updateReply = async (req, res) => {
    try {
        const ReplyId = req.params.id;
        const userId = req.userId;
        const updateFields = req.body;
        const reply = await Reply.findById(ReplyId);
        if (!reply) {
            res.status(404).json({ error: "That Reply doesn't exist in our database" });
            return;
        }
        if (reply.authorId.toString() !== userId) {
            res.status(403).json({ error: "You do not own that Reply and therefore cannot edit or change it." });
            return;
        }
        const updatedReply = await Reply.findOneAndUpdate({ _id: ReplyId }, updateFields, { new: true });
        res.status(200).json({ message: "Reply Updated successfully", updatedReply });
    }
    catch (error) {
        throw error;
    }
};
const deleteReply = async (req, res) => {
    try {
        const ReplyId = req.params.id;
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        const reply = await Reply.findById(ReplyId);
        // console.log(isAdmin);
        if (!reply) {
            res.status(404).json({ error: "That Reply doesn't exist in our database" });
            return;
        }
        if (reply.authorId.toString() !== userId && isAdmin !== true) {
            res.status(403).json({ error: "You do not own that reply and therefore cannot delete it." });
            return;
        }
        const deletedReply = await Reply.findOneAndDelete({ _id: ReplyId });
        res.status(200).json({ message: "Reply deleted successfully", deletedReply });
    }
    catch (error) {
        throw error;
    }
};
export { getAllReplies, createReply, getSingleReply, updateReply, deleteReply, getCommentReplies };
//# sourceMappingURL=reply.js.map