"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_1 = require("../controllers/comment");
const commentValidation_1 = require("../middleware/commentValidation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", comment_1.getAllComments);
router.post("/", auth_1.userAuthJWT, commentValidation_1.validateComment, comment_1.createComment);
router.get("/:id", auth_1.userAuthJWT, comment_1.getSingleComment);
router.put("/:id", auth_1.userAuthJWT, commentValidation_1.validateComment, comment_1.updateComment);
router.delete("/:id", auth_1.userAuthJWT, comment_1.deleteComment);
exports.default = router;
