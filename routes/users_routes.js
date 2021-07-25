import express from "express"
import { signIn, signUp, getUsers, authenticate, updateUser } from "../controllers/users_controller.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/signin", signIn)
router.post("/signup", signUp)
router.get("/authenticate", auth, authenticate)
router.patch("/:id", auth, updateUser)
router.get("/", getUsers)

export default router
