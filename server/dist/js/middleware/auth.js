"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthJWT = exports.userAuthJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const userAuthJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }
            const { id, username, isAdmin } = decoded;
            req.userId = id;
            req.lUsername = username;
            req.isAdmin = isAdmin;
            next();
        });
    }
    else {
        res.status(401).json({ message: 'You need to login to access this resource; Please login or create an account' });
    }
};
exports.userAuthJWT = userAuthJWT;
const adminAuthJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }
            const { id, username, isAdmin } = decoded;
            req.userId = id;
            req.lUsername = username;
            req.isAdmin = isAdmin;
            if (!isAdmin) {
                return res.status(403).json({ message: 'You are not allowed to access this resource, Please contact the site administrator for assistance' });
            }
            next();
        });
    }
    else {
        res.status(401).json({ message: 'You need to login to access this resource; Please login or create an account' });
    }
};
exports.adminAuthJWT = adminAuthJWT;
