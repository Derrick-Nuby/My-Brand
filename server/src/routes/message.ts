import { Router } from "express"
import { getAllMessages, createMessage, getSingleMessage, deleteMessage } from '../controllers/message.js'
import { validateMessage } from '../middleware/messageValidation.js';
import { adminAuthJWT, userAuthJWT } from '../middleware/auth.js';


const router: Router = Router()

router.get("/", adminAuthJWT, getAllMessages)

router.post("/", validateMessage, createMessage)

router.get("/:id", getSingleMessage)

router.delete("/:id", adminAuthJWT, deleteMessage)

export default router