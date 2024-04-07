import { Router } from "express";
import { getAllMessages, createMessage, getSingleMessage, deleteMessage } from '../controllers/message.js';
import { validateMessage } from '../middleware/messageValidation.js';
import { adminAuthJWT } from '../middleware/auth.js';
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Endpoints related to messages & querry management
 */
/**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Get all messages
 *     description: Endpoint to retrieve all messages. Requires admin authentication.
 *     tags: [Messages]
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
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       '401':
 *         description: Unauthorized - Admin authentication required
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         names:
 *           type: string
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         phone:
 *           type: string
 *         message:
 *           type: string
 */
router.get("/", adminAuthJWT, getAllMessages);
/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Create a new message
 *     description: Endpoint to create a new and send a new message.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Message created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Error sending email
 */
router.post("/", validateMessage, createMessage);
/**
 * @swagger
 * /api/message/{id}:
 *   get:
 *     summary: Get a single message by ID
 *     description: Endpoint to retrieve a single message by its ID.
 *     tags: [Messages]
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
 *                   $ref: '#/components/schemas/Message'
 *       '404':
 *         description: Message not found
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", adminAuthJWT, getSingleMessage);
/**
 * @swagger
 * /api/message/{id}:
 *   delete:
 *     summary: delete a single message by ID
 *     description: Endpoint to delete a single message by its ID.
 *     tags: [Messages]
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
 *                   $ref: '#/components/schemas/Message'
 *       '404':
 *         description: Message not found
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", adminAuthJWT, deleteMessage);
export default router;
//# sourceMappingURL=message.js.map