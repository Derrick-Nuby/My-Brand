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
exports.deleteComment = exports.getSingleComment = exports.createComment = exports.getAllContacts = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.default.find();
        if (comments.length === 0) {
            res.status(404).json({ message: "There are no currently no comments to view! Thank you for the visit :) " });
        }
        res.status(200).json({ comments });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllContacts = getAllContacts;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const userId = req.userId;
        const lUsername = req.lUsername;
        const comment = new comment_1.default({
            authorId: userId,
            authorName: lUsername,
            blogId: body.blogId,
            content: body.content,
        });
        const newComment = yield comment.save();
        res
            .status(201)
            .json({ message: "Comment created successfully", Comment: newComment });
    }
    catch (error) {
        throw error;
    }
});
exports.createComment = createComment;
const getSingleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CommentId = req.params.id;
        const singleComment = yield comment_1.default.findOne({ _id: CommentId });
        if (!singleComment) {
            res.status(404).json({ message: "That Comment doesn't exist on our database" });
        }
        res.status(200).json({ singleComment });
    }
    catch (error) {
        throw error;
    }
});
exports.getSingleComment = getSingleComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CommentId = req.params.id;
        const updateFields = req.body;
        const deletedComment = yield comment_1.default.findOneAndUpdate({ _id: CommentId }, updateFields, { new: true });
        if (!deletedComment) {
            res.status(404).json({ message: "That Comment doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Comment deleted successfully", deletedComment });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteComment = deleteComment;
