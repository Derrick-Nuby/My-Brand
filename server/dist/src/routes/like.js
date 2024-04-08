import { Router } from "express";
import { getAllLikes, createLike, updateLike, deleteLike } from '../controllers/like.js';
import { userAuthJWT } from '../middleware/auth.js';
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Endpoints related to likes
 */
/**
 * @swagger
 * /api/like:
 *   get:
 *     summary: Get all likes
 *     description: Endpoint to retrieve all likes. Requires admin authentication.
 *     tags: [Likes]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Like'
 *       '401':
 *         description: Unauthorized - Admin authentication required
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         authorId:
 *           type: string
 *         authorName:
 *           type: string
 *         blogId:
 *           type: string
 *         liked:
 *           type: boolean
 */
router.get("/", getAllLikes);
/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Create a new like
 *     description: Endpoint to create a new like.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *               liked:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Error sending email
 */
router.post("/", userAuthJWT, createLike);
router.put("/:id", userAuthJWT, updateLike);
router.delete("/:id", userAuthJWT, deleteLike);
export default router;
//# sourceMappingURL=like.js.map