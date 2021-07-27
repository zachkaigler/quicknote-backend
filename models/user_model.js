import mongoose from "mongoose"
import { noteSchema } from "./note_model.js"

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notes: [noteSchema],
    theme: { type: String, default: "dark" }
})

const User = mongoose.model("User", userSchema)

export default User