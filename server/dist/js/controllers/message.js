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
exports.deleteMessage = exports.getSingleMessage = exports.createMessage = exports.getAllMessages = void 0;
const message_1 = __importDefault(require("../models/message"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_1.default.find();
        if (messages.length === 0) {
            res.status(404).json({ message: "There are no currently no messages to view! Thank you for the visit :) " });
        }
        res.status(200).json({ messages });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllMessages = getAllMessages;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const message = new message_1.default({
            names: body.names,
            email: body.email,
            subject: body.subject,
            phone: body.phone,
            message: body.message,
        });
        const newMessage = yield message.save();
        res
            .status(201)
            .json({ message: "Message created successfully", Message: newMessage });
    }
    catch (error) {
        throw error;
    }
});
exports.createMessage = createMessage;
const getSingleMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MessageId = req.params.id;
        const singleMessage = yield message_1.default.findOne({ _id: MessageId });
        if (!singleMessage) {
            res.status(404).json({ message: "That Message doesn't exist on our database" });
        }
        res.status(200).json({ singleMessage });
    }
    catch (error) {
        throw error;
    }
});
exports.getSingleMessage = getSingleMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MessageId = req.params.id;
        const deletedMessage = yield message_1.default.findOneAndDelete({ _id: MessageId });
        if (!deletedMessage) {
            res.status(404).json({ message: "That Message doesn't exist in our database" });
            return;
        }
        res.status(200).json({ message: "Message deleted successfully", deletedMessage });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteMessage = deleteMessage;
