import mongoose from "mongoose"

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    color: String,
    date: String,
    pinned: Boolean
})

const Note = mongoose.model("Note", noteSchema)

export default Note