"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = void 0;
const joi_1 = __importDefault(require("joi"));
const messageSchema = joi_1.default.object({
    names: joi_1.default.string()
        .required()
        .min(5)
        .messages({
        'string.empty': 'Please input your names',
        'string.min': 'Please include all of your names',
    }),
    email: joi_1.default.string()
        .required()
        .email()
        .messages({
        'string.empty': 'Please input your names',
        'string.email': 'the email format is wrong',
    }),
    subject: joi_1.default.string()
        .required()
        .min(5)
        .messages({
        'string.empty': 'Please input the subject of your message',
        'string.min': 'Subject must be at least {#limit} characters long',
    }),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Invalid Phone format',
    }),
    message: joi_1.default.string()
        .required()
        .min(50)
        .messages({
        'string.empty': 'Please input your message',
        'string.min': 'Your message body must be at least {#limit} characters long',
    }),
});
const validateMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield messageSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating message Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateMessage = validateMessage;
