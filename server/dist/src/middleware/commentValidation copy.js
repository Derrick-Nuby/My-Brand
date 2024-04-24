import Joi from 'joi';
import Article from '../models/article.js';
import mongoose from 'mongoose';
const commentSchema = Joi.object({
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
    content: Joi.string()
        .required()
        .messages({
        'string.empty': 'The content is required',
    }),
});
const validateComment = async (req, res, next) => {
    try {
        const { error } = await commentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        // const { blogId } = req.body;
        const { blogId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: 'Invalid blogId format' });
        }
        const article = await Article.findById(blogId);
        if (!article) {
            return res.status(404).json({ message: 'The specified article does not exist' });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { validateComment };
//# sourceMappingURL=commentValidation%20copy.js.map