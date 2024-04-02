import { Router } from "express"
import { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle } from '../controllers/article'
import { validateCreateArticle } from '../middleware/articleValidation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const router: Router = Router()


router.get("/", userAuthJWT, getAllArticles)

router.post("/", adminAuthJWT, upload.single('image'), createArticle)

router.get("/:id", userAuthJWT, getSingleArticle)

router.put("/:id", adminAuthJWT, updateArticle)

router.delete("/:id", adminAuthJWT, deleteArticle)

export default router