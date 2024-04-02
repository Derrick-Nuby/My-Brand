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
exports.validateComment = void 0;
const joi_1 = __importDefault(require("joi"));
const article_1 = __importDefault(require("../models/article"));
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = joi_1.default.object({
    authorId: joi_1.default.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author id',
    }),
    authorName: joi_1.default.string()
        .strip()
        .messages({
        'string.strip': 'there was no need to submit the author name',
    }),
    blogId: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'The blog id is required',
    }),
    content: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'The content is required',
    }),
});
const validateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield commentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        // const { blogId } = req.body;
        const { blogId } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: 'Invalid blogId format' });
        }
        const article = yield article_1.default.findById(blogId);
        if (!article) {
            return res.status(404).json({ message: 'The specified article does not exist' });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateComment = validateComment;
