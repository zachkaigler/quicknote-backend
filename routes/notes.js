import express from "express"
import { getNotes } from "../controllers/notes_controller.js"

const router = express.Router()

router.get('/', getNotes)

export default router