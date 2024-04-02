"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    names: {
        type: String,
    },
    email: {
        type: String,
    },
    subject: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)("Message", messageSchema);
