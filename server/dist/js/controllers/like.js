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
exports.deleteLike = exports.updateLike = exports.createLike = exports.getAllLikes = void 0;
const like_1 = __importDefault(require("../models/like"));
const getAllLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield like_1.default.find();
        if (likes.length === 0) {
            res.status(404).json({ message: "There are currently no likes to view :) " });
        }
        res.status(200).json({ likes });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllLikes = getAllLikes;
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const userId = req.userId;
        const lUsername = req.lUsername;
        const like = new like_1.default({
            authorId: userId,
            authorName: lUsername,
            blogId: body.blogId,
            content: body.liked,
        });
        const newLike = yield like.save();
        res
            .status(201)
            .json({ message: "Like created successfully", Like: newLike });
    }
    catch (error) {
        throw error;
    }
});
exports.createLike = createLike;
const updateLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeId = req.params.id;
        const updateFields = req.body;
        const updatedLike = yield like_1.default.findOneAndUpdate({ _id: likeId }, updateFields, { new: true });
        if (!updatedLike) {
            res.status(404).json({ message: "That Like doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Like Updated successfully", updatedLike });
    }
    catch (error) {
        throw error;
    }
});
exports.updateLike = updateLike;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeID = req.params.id;
        const deletedLike = yield like_1.default.findOneAndDelete({ _id: likeID });
        if (!deletedLike) {
            res.status(404).json({ message: "That like doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Like deleted successfully", deletedLike });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteLike = deleteLike;
