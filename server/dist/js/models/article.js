"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    authorId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    author: {
        type: String,
    },
    tags: {
        type: String,
    },
    description: {
        type: String,
    },
    comments: {
        type: String,
    },
    likes: {
        type: String,
    },
});
exports.default = (0, mongoose_1.model)("Artcile", articleSchema);
