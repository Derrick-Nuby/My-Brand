import { Router } from "express"
import { getAllLikes, createLike, updateLike, deleteLike, likeCounter } from '../controllers/like.js'
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/userValidation.js';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth.js';

const router: Router = Router()

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
 *                 likes:
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

router.get("/", getAllLikes)

router.get("/count/:id", likeCounter)


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
 *         description: Like created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: internal server error
 */

router.post("/", userAuthJWT, createLike)

/**
 * @swagger
 * /api/like/{id}:
 *   put:
 *     summary: Modify a like
 *     description: Endpoint to modify a like.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the like to retrieve
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
 *         description: like modified successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: internal server error
 */

router.put("/:id", userAuthJWT, updateLike)

/**
 * @swagger
 * /api/like/{id}:
 *   delete:
 *     summary: delete a single like by ID
 *     description: Endpoint to delete a single like by its ID.
 *     tags: [Likes]
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
 *                   $ref: '#/components/schemas/Like'
 *       '404':
 *         description:  not found
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *       '500':
 *         description: Internal server error
 */


router.delete("/:id", userAuthJWT, deleteLike)

export default router