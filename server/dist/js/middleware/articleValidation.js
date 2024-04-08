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
exports.validateCreateArticle = void 0;
const joi_1 = __importDefault(require("joi"));
const articleSchema = joi_1.default.object({
    title: joi_1.default.string()
        .required()
        .min(12)
        .messages({
        'string.empty': 'Title is required',
        'string.min': 'Article title must be at least {#limit} characters long',
    }),
    authorId: joi_1.default.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author id',
    }),
    author: joi_1.default.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author name',
    }),
    tags: joi_1.default.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author name',
    }),
    description: joi_1.default.string()
        .required()
        .min(1000)
        .messages({
        'string.empty': 'descriptiton required is required',
        'string.min': 'Article description must be at least {#limit} characters long',
    }),
}).unknown();
const validateCreateArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield articleSchema.validate(req.body, { abortEarly: false });
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
});
exports.validateCreateArticle = validateCreateArticle;
