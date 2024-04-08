import { Router } from "express";
import { getAllArticles, createArticle, getSingleArticle, updateArticle, deleteArticle } from '../controllers/article.js';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth.js';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Endpoints related to articles
 */
/**
 * @swagger
 * /api/article:
 *   get:
 *     summary: Get all artilce
 *     description: Endpoint to retrieve all articles.
 *     tags: [Articles]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       '401':
 *         description: Unauthorized - Admin authentication required
 *       '404':
 *         description: There are no currently no articles to view! Thank you for the visit :)
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         image:
 *           type: string
 *         title:
 *           type: string
 *         authorId:
 *           type: string
 *         author:
 *           type: string
 *         tags:
 *           type: string
 *         description:
 *           type: string
 */
router.get("/", getAllArticles);
/**
 * @swagger
 * /api/article:
 *   post:
 *     summary: Create a new article
 *     description: Endpoint to create a new article with an image upload to Cloudinary.
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Bad request - Image file is missing or invalid request body
 *       '401':
 *         description: Unauthorized - Admin authentication required
 *       '500':
 *         description: Internal server error
 */
router.post("/", adminAuthJWT, upload.single('image'), createArticle);
/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     summary: Get a single artilce by ID
 *     description: Endpoint to retrieve a single article by its ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to retrieve
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 singleArticle:
 *                   $ref: '#/components/schemas/Article'
 *       '404':
 *         description: Message not found
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", userAuthJWT, getSingleArticle);
/**
 * @swagger
 * /api/article/{id}:
 *   put:
 *     summary: Modify an article
 *     description: Endpoint to modify an article.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the article to retrieve
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               tags:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Error sending email
 */
router.put("/:id", adminAuthJWT, updateArticle);
/**
 * @swagger
 * /api/article/{id}:
 *   delete:
 *     summary: delete a single article by ID
 *     description: Endpoint to delete a single article by its ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the message to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 singleMessage:
 *                   $ref: '#/components/schemas/Article'
 *       '404':
 *         description: Comment not found
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", adminAuthJWT, deleteArticle);
export default router;
//# sourceMappingURL=article.js.map