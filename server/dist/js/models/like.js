"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    authorId: {
        type: String,
    },
    authorName: {
        type: String,
    },
    blogId: {
        type: String,
    },
    liked: {
        type: Boolean,
    },
});
exports.default = (0, mongoose_1.model)("Like", likeSchema);
