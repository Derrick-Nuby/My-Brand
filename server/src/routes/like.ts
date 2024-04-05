import { Router } from "express"
import { getAllLikes, createLike, updateLike, deleteLike } from '../controllers/like.js'
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/userValidation.js';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth.js';


const router: Router = Router()


router.get("/", getAllLikes)

router.post("/", userAuthJWT, createLike)

router.put("/:id", userAuthJWT, updateLike)

router.delete("/:id", userAuthJWT, deleteLike)

export default router