import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }],
    theme: { type: String, default: "light" },
    fnd: { type: Boolean, default: false }
})

const User = mongoose.model("User", userSchema)

export default User