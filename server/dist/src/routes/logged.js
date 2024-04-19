import { Router } from "express";
import { adminAuthJWT, userAuthJWT } from '../middleware/auth.js';
const router = Router();
router.get("/authuser", userAuthJWT);
router.get("/authadmin", adminAuthJWT);
export default router;
//# sourceMappingURL=logged.js.map