import Joi from 'joi';
import Article from '../models/article.js';
import Comment from '../models/comment.js';
import mongoose from 'mongoose';
const replySchema = Joi.object({
    authorId: Joi.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author id',
    }),
    authorName: Joi.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author name',
    }),
    blogId: Joi.string()
        .required()
        .messages({
        'string.empty': 'The blog id is required',
    }),
    parentId: Joi.string()
        .required()
        .messages({
        'string.empty': 'The parent comment id is required',
    }),
    content: Joi.string()
        .required()
        .messages({
        'string.empty': 'The content is required',
    }),
});
const validateReply = async (req, res, next) => {
    try {
        const { error } = await replySchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ error: errorMessage });
        }
        // const { blogId } = req.body;
        const { blogId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: 'Invalid blogId format' });
        }
        const article = await Article.findById(blogId);
        if (!article) {
            return res.status(404).json({ error: 'The specified article does not exist' });
        }
        const { parentId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(parentId)) {
            return res.status(400).json({ message: 'Invalid commentID format' });
        }
        const reply = await Comment.findById(parentId);
        if (!reply) {
            return res.status(404).json({ error: 'The specified comment does not exist' });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { validateReply };
//# sourceMappingURL=replyValidation.js.map