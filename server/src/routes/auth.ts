import { Router } from "express"
import { createAccount, loginUser, getAllUsers, modifyUser, deleteUser, logoutUser, getSingleUser } from "../controllers/auth"
import { validateUserRegister, validateUserLogin, validateUserUpdate } from '../middleware/validation';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth';

const router: Router = Router()

router.post("/create", validateUserRegister, createAccount)

router.post("/login", validateUserLogin, loginUser)

router.get("/all", adminAuthJWT, getAllUsers)

router.put("/", userAuthJWT, validateUserUpdate, modifyUser)

router.delete("/", userAuthJWT, deleteUser)

router.get('/logout', userAuthJWT, logoutUser);

router.get('/you', userAuthJWT, getSingleUser);


export default router