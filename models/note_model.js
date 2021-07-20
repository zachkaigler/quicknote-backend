import mongoose from "mongoose"

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    color: String,
    date: String,
    pinned: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Note = mongoose.model("Note", noteSchema)

export default Note