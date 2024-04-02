import { Router } from "express"
import { getAllMessages, createMessage, getSingleMessage, deleteMessage } from '../controllers/message'
import { validateMessage } from '../middleware/messageValidation';


const router: Router = Router()

router.get("/", getAllMessages)

router.post("/", validateMessage, createMessage)

router.get("/:id", getSingleMessage)

router.delete("/:id", deleteMessage)

export default router