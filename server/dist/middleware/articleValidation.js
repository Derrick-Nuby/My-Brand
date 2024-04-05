import Joi from 'joi';
const articleSchema = Joi.object({
    title: Joi.string()
        .required()
        .min(12)
        .messages({
        'string.empty': 'Title is required',
        'string.min': 'Article title must be at least {#limit} characters long',
    }),
    authorId: Joi.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author id',
    }),
    author: Joi.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author name',
    }),
    tags: Joi.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author name',
    }),
    description: Joi.string()
        .required()
        .min(1000)
        .messages({
        'string.empty': 'descriptiton required is required',
        'string.min': 'Article description must be at least {#limit} characters long',
    }),
}).unknown();
const validateCreateArticle = async (req, res, next) => {
    try {
        const { error } = await articleSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating Article Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { validateCreateArticle };
//# sourceMappingURL=articleValidation.js.map