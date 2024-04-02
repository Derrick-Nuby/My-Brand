"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    authorId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
    },
    authorName: {
        type: String,
    },
    blogId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Article',
    },
    liked: {
        type: Boolean,
    },
});
exports.default = (0, mongoose_1.model)("Like", likeSchema);
