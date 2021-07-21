import mongoose from "mongoose"
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

export const updateNote = async (req, res) => {
    const { id: _id } = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Note not found")

    const updatedNote = await Note.findByIdAndUpdate(_id, req.body, { new: true })
    const user = await User.findById(req.body.user)
    user.notes = [...user.notes.map((note) => {
        if (note._id.toString() === updatedNote._id.toString()) {
            return updatedNote
        } else {
            return note
        }
    })]
    await user.save()
    res.status(200).json(updatedNote)
}