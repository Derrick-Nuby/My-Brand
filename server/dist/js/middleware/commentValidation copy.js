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
exports.validateUserUpdate = exports.validateUserLogin = exports.validateUserRegister = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .min(4)
        .pattern(new RegExp('^[a-zA-Z0-9 ]+$'))
        .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.pattern.base': 'Name must contain only alphanumeric characters Or a space',
    }),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Invalid Phone format',
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&^]{8,15}$'))
        .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    }),
    confirmPassword: joi_1.default.string()
        .valid(joi_1.default.ref('password'))
        .required()
        .messages({
        'any.only': 'Passwords do not match',
    }),
    isAdmin: joi_1.default.boolean()
        .valid(false)
        .default(false)
        .messages({
        'boolean.valid': 'You do not have privileges to create an admin.',
    }),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&^]{8,15}$'))
        .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    })
});
const validateUserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateUserRegister = validateUserRegister;
const validateUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateUserLogin = validateUserLogin;
const validateUserUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateUserUpdate = validateUserUpdate;
