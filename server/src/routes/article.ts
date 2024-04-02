import { Router } from "express"
import { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle } from '../controllers/article'
import { validateCreateArticle } from '../middleware/articleValidation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';


const router: Router = Router()


router.get("/", userAuthJWT, getAllArticles)

router.post("/", adminAuthJWT, validateCreateArticle, createArticle)

router.get("/:id", userAuthJWT, getSingleArticle)

router.put("/:id", adminAuthJWT, updateArticle)

router.delete("/:id", adminAuthJWT, deleteArticle)

export default router