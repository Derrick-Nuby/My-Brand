import bcrypt from "bcryptjs";
import User from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const createAccount = async (req, res) => {
    try {
        const { name, phone, email, password, isAdmin } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with that email already exists, if that is you.. please login or reset your password" });
        }
        const user = new User({
            name,
            phone,
            email,
            password,
            isAdmin,
        });
        const newUser = await user.save();
        res
            .status(201)
            .json({ message: "User Created Successfully", user: { name, email } });
    }
    catch (error) {
        throw error;
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const { id, name, email: userEmail, isAdmin } = user;
        const token = jwt.sign({ id, username: name, email: userEmail, isAdmin }, 'jwtSecret');
        const expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        res.cookie('jwt', token, { httpOnly: true, path: '/', expires: expiryDate }),
            res.status(200).json({ message: "User logged in successfully", user: { id, username: name, email: userEmail, isAdmin }, token });
    }
    catch (error) {
        // Handle any errors
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
};
const modifyUser = async (req, res) => {
    try {
        const userId = req.userId;
        const updateFields = req.body;
        const { name, phone, email, password } = req.body;
        // Check if the 'password' field is being updated
        if (updateFields.password) {
            // Hash the new password
            updateFields.password = await bcrypt.hash(updateFields.password, 10);
        }
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'User updated',
            user: {
                name: name,
                phone: phone,
                email: email,
            }
        });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { password, confirmation } = req.body;
        const userId = req.userId;
        if (!password || typeof confirmation !== 'boolean') {
            return res.status(400).json({ message: 'Password and confirmation are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid || !confirmation) {
            return res.status(401).json({ message: 'Invalid password or confirmation' });
        }
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser,
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'User logged out successfully' });
};
const getSingleUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({});
        }
        const { _id, name, phone, email } = user;
        res.status(200).json({ message: "You are logged in as",
            user: {
                _id,
                name,
                phone,
                email,
            },
        });
    }
    catch (error) {
        throw error;
    }
};
export { createAccount, loginUser, getAllUsers, modifyUser, deleteUser, logoutUser, getSingleUser };
//# sourceMappingURL=auth.js.map