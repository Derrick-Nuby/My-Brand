import { Router } from "express"
import { getAllLikes, createLike, updateLike, deleteLike } from '../controllers/like'
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/validation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';


const router: Router = Router()


router.get("/", getAllLikes)

router.post("/", createLike)

router.put("/:id", updateLike)

router.delete("/:id", deleteLike)

export default router