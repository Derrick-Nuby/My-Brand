import { Router } from "express"
import { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle } from '../controllers/article'
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/validation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';


const router: Router = Router()


router.get("/", getAllArticles)

router.post("/", createArticle)

router.get("/:id", getSingleArticle)

router.put("/:id", updateArticle)

router.delete("/:id", deleteArticle)

export default router