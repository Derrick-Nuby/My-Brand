"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_1 = require("../controllers/article");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = (0, express_1.Router)();
router.get("/", auth_1.userAuthJWT, article_1.getAllArticles);
router.post("/", auth_1.adminAuthJWT, upload.single('image'), article_1.createArticle);
router.get("/:id", auth_1.userAuthJWT, article_1.getSingleArticle);
router.put("/:id", auth_1.adminAuthJWT, article_1.updateArticle);
router.delete("/:id", auth_1.adminAuthJWT, article_1.deleteArticle);
exports.default = router;
