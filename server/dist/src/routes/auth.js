import { Router } from "express";
import { createAccount, loginUser, getAllUsers, modifyUser, deleteUser, logoutUser, getSingleUser } from "../controllers/auth.js";
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/userValidation.js';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth.js';
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user management
 */
/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user account
 *     description: Endpoint to create a new user account.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: User Created Successfully
 *       '400':
 *         description: Bad request or user with the provided email already exists
 *       '500':
 *         description: Internal server error
 */
router.post("/create", validateUserRegister, createAccount);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Invalid password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post("/login", validateUserLogin, loginUser);
/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to retrieve all users. Requires admin authentication.
 *     tags: [Users]
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
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 */
router.get("/all", adminAuthJWT, getAllUsers);
/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Update user information
 *     description: Endpoint to update user information.
 *     tags: [Users]
 *     security:
 *       - cookieAuth: [] # Use cookie authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized - JWT cookie not provided or invalid
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.put("/", userAuthJWT, validateUserUpdate, modifyUser);
/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Delete logged in user
 *     description: Endpoint to delete a logged in user account.
 *     tags: [Users]
 *     security:
 *       - cookieAuth: [] # Use cookie authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmation:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Password and confirmation are required
 *       '401':
 *         description: Invalid password or confirmation
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/", userAuthJWT, deleteUser);
/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Logout user
 *     description: Endpoint to logout the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: Unauthorized - User is not authenticated
 *       '500':
 *         description: Internal server error
 */
router.get('/logout', userAuthJWT, logoutUser);
/**
 * @swagger
 * /api/user/you:
 *   get:
 *     summary: LoggedIn User
 *     description: Endpoint to see the currently authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: Unauthorized - User is not authenticated
 *       '500':
 *         description: Internal server error
 */
router.get('/you', userAuthJWT, getSingleUser);
export default router;
//# sourceMappingURL=auth.js.map