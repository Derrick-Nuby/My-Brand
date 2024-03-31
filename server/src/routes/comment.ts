import { Router } from "express"
import { getAllComments, createComment, getSingleComment, updateComment, deleteComment } from '../controllers/comment'
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/validation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';


const router: Router = Router()


router.get("/", getAllComments)

router.post("/", createComment)

router.get("/:id", getSingleComment)

router.put("/:id", updateComment)

router.delete("/:id", deleteComment)

export default router