import express from "express"
import { signIn, signUp, getUsers } from "../controllers/users_controller.js"

const router = express.Router()

router.post("/signin", signIn)
router.post("/signup", signUp)
router.get("/", getUsers)

export default router
