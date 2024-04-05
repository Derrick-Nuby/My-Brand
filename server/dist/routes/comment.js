import { Router } from "express";
import { getAllComments, createComment, getSingleComment, updateComment, deleteComment } from '../controllers/comment.js';
import { validateComment } from '../middleware/commentValidation.js';
import { userAuthJWT } from '../middleware/auth.js';
const router = Router();
router.get("/", getAllComments);
router.post("/", userAuthJWT, validateComment, createComment);
router.get("/:id", userAuthJWT, getSingleComment);
router.put("/:id", userAuthJWT, validateComment, updateComment);
router.delete("/:id", userAuthJWT, deleteComment);
export default router;
//# sourceMappingURL=comment.js.map