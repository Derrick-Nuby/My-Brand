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
exports.deleteArticle = exports.updateArticle = exports.getSingleArticle = exports.createArticle = exports.getAllArticles = void 0;
const article_1 = __importDefault(require("../models/article"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield article_1.default.find();
        if (articles.length === 0) {
            res.status(404).json({ message: "There are no currently no articles to view! Thank you for the visit :) " });
        }
        res.status(200).json({ articles });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllArticles = getAllArticles;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const article = new article_1.default({
            image: body.image,
            title: body.title,
            author: body.author,
            tags: body.tags,
            description: body.description,
            comments: body.comments,
            likes: body.likes,
        });
        const newArticle = yield article.save();
        res
            .status(201)
            .json({ message: "Article created successfully", article: newArticle });
    }
    catch (error) {
        throw error;
    }
});
exports.createArticle = createArticle;
const getSingleArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.id;
        const singleArticle = yield article_1.default.findOne({ _id: articleId });
        if (!singleArticle) {
            res.status(404).json({ message: "That article doesn't exist on our database" });
        }
        res.status(200).json({ singleArticle });
    }
    catch (error) {
        throw error;
    }
});
exports.getSingleArticle = getSingleArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.id;
        const updateFields = req.body;
        const updatedArticle = yield article_1.default.findOneAndUpdate({ _id: articleId }, updateFields, { new: true });
        if (!updatedArticle) {
            res.status(404).json({ message: "That article doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Article Updated successfully", updatedArticle });
    }
    catch (error) {
        throw error;
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.id;
        const updateFields = req.body;
        const deletedArticle = yield article_1.default.findOneAndUpdate({ _id: articleId }, updateFields, { new: true });
        if (!deletedArticle) {
            res.status(404).json({ message: "That article doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Article deleted successfully", deletedArticle });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteArticle = deleteArticle;
