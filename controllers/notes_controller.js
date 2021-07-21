import Note from "../models/note_model.js"
import User from "../models/user_model.js"

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const createNote = async (req, res) => {
    const newNote = new Note(req.body)
    const user = await User.findById(req.body.user)
    try {
        await newNote.save()
        user.notes.push(newNote)
        await user.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}