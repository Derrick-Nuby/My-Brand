import { Router } from "express";
import { getAllLikes, createLike, updateLike, deleteLike } from '../controllers/like.js';
import { userAuthJWT } from '../middleware/auth.js';
const router = Router();
router.get("/", getAllLikes);
router.post("/", userAuthJWT, createLike);
router.put("/:id", userAuthJWT, updateLike);
router.delete("/:id", userAuthJWT, deleteLike);
export default router;
//# sourceMappingURL=like.js.map