import { Router } from "express"
import { loggedAdminAuth, loggedUserAuth } from '../middleware/auth.js';

const router: Router = Router()

router.get("/authuser", loggedUserAuth)

router.get("/authadmin", loggedAdminAuth)



export default router