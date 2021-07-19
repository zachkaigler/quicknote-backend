import Note from "../models/note_model.js"

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}