import express from "express"
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/notes_controller.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get('/', getNotes)
router.post('/', auth, createNote)
router.patch('/:id', auth, updateNote)
router.delete('/:id', auth, deleteNote)

export default router