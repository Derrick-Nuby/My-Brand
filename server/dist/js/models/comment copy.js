"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    authorId: {
        type: String,
    },
    authorName: {
        type: String,
    },
    blogId: {
        type: String,
    },
    content: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)("Comment", commentSchema);
