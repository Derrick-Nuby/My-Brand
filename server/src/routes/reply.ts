import { Router } from "express"
import { getAllReplies, createReply, getSingleReply, updateReply, deleteReply, getCommentReplies } from '../controllers/reply.js'
import { validateReply } from '../middleware/replyValidation.js';
import { userAuthJWT } from '../middleware/auth.js';


const router: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints related to comments
 */

/**
 * @swagger
 * /api/comment:
 *   get:
 *     summary: Get all comments
 *     description: Endpoint to retrieve all comments.
 *     tags: [Comments]
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
 *                     $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: no comments
 *       '500':
 *         description: Internal server error
 * 
 * components:
 *   schemas:
 *     Comment:
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
 *         content:
 *           type: string
 *         timestamp:
 *           type: string
 */

router.get("/", getAllReplies)

/**
 * @swagger
 * /api/comment:
 *   post:
 *     summary: Create a new comment
 *     description: Endpoint to create a new comment. Requires to be logged in [authenticated]
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized - user authentication required
 *       '403':
 *         description: failed to authenticate token
 *       '500':
 *         description: internal server error
 */

router.post("/", userAuthJWT, validateReply, createReply)

/**
 * @swagger
 * /api/comment/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     description: Endpoint to retrieve a single comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to retrieve
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
 *                 singleComment:
 *                   $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: comment not found
 *       '401':
 *         description: Unauthorized - user authentication required
 *       '403':
 *         description: failed to authenticate token
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", userAuthJWT, getSingleReply)


router.get("/comment/:id", getCommentReplies)

/**
 * @swagger
 * /api/comment/{id}:
 *   put:
 *     summary: Modify a comment
 *     description: Endpoint to modify a comment.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to retrieve
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
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: internal server error
 */

router.put("/:id", userAuthJWT, validateReply, updateReply)

/**
 * @swagger
 * /api/comment/{id}:
 *   delete:
 *     summary: delete a single comment by ID
 *     description: Endpoint to delete a single comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to retrieve
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
 *                 singleComment:
 *                   $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: Comment not found
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", userAuthJWT, deleteReply)

export default router