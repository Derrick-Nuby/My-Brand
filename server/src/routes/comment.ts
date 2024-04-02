import { Router } from "express"
import { getAllComments, createComment, getSingleComment, updateComment, deleteComment } from '../controllers/comment'
import { validateComment } from '../middleware/commentValidation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';


const router: Router = Router()


router.get("/", getAllComments)

router.post("/", userAuthJWT, validateComment, createComment)

router.get("/:id", userAuthJWT, getSingleComment)

router.put("/:id", userAuthJWT, validateComment, updateComment)

router.delete("/:id", userAuthJWT, deleteComment)

export default router