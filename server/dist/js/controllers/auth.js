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
exports.getSingleUser = exports.logoutUser = exports.deleteUser = exports.modifyUser = exports.getAllUsers = exports.loginUser = exports.createAccount = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, password, isAdmin } = req.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with that email already exists, if that is you.. please login or reset your password" });
        }
        const user = new user_1.default({
            name,
            phone,
            email,
            password,
            isAdmin,
        });
        const newUser = yield user.save();
        res
            .status(201)
            .json({ message: "User Created Successfuly", user: { name, email } });
    }
    catch (error) {
        throw error;
    }
});
exports.createAccount = createAccount;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const { id, name, email: userEmail, isAdmin } = user;
        const token = jsonwebtoken_1.default.sign({ id, username: name, email: userEmail, isAdmin }, 'jwtSecret');
        const expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        res.cookie('jwt', token, { httpOnly: true, path: '/', expires: expiryDate }),
            res.status(200).json({ message: "User logged in successfully", user: { id, username: name, email: userEmail, isAdmin }, token });
    }
    catch (error) {
        // Handle any errors
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const updateFields = req.body;
        // Check if the 'password' field is being updated
        if (updateFields.password) {
            // Hash the new password
            updateFields.password = yield bcryptjs_1.default.hash(updateFields.password, 10);
        }
        const updatedUser = yield user_1.default.findOneAndUpdate({ _id: userId }, updateFields, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'User updated',
            user: updatedUser,
        });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.modifyUser = modifyUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmation } = req.body;
        const userId = req.userId;
        if (!password || typeof confirmation !== 'boolean') {
            return res.status(400).json({ message: 'Password and confirmation are required' });
        }
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid || !confirmation) {
            return res.status(401).json({ message: 'Invalid password or confirmation' });
        }
        const deletedUser = yield user_1.default.findOneAndDelete({ _id: userId });
        res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser,
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteUser = deleteUser;
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'User logged out successfully' });
};
exports.logoutUser = logoutUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const users = yield user_1.default.find({ _id: userId });
        res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
exports.getSingleUser = getSingleUser;
