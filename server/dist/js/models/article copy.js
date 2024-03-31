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
    author: {
        type: String,
    },
    tags: [String],
    description: {
        type: String,
    },
    comments: [String],
    likes: [String]
});
exports.default = (0, mongoose_1.model)("Artcile", articleSchema);
