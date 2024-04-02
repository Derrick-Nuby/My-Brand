import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


const messageSchema = Joi.object({
    names: 
    Joi.string()
        .required()
        .min(5)
        .messages({
        'string.empty': 'Please input your names',
        'string.min': 'Please include all of your names',
    }),

    email: 
    Joi.string()
        .required()
        .email()
        .messages({
        'string.empty': 'Please input your names',
        'string.email': 'the email format is wrong',
    }),

    subject: 
    Joi.string()
        .required()
        .min(5)
        .messages({
        'string.empty': 'Please input the subject of your message',
        'string.min': 'Subject must be at least {#limit} characters long',
    }),

    phone: 
    Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Invalid Phone format',
    }),

    message: 
    Joi.string()
        .required()
        .min(50)
        .messages({
        'string.empty': 'Please input your message',
        'string.min': 'Your message body must be at least {#limit} characters long',

    }),
});



const validateMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = await messageSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ message: errorMessage });
    }
    next();
  } catch (err) {
    console.error('Error validating message Creation:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};






export { validateMessage };
