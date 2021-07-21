import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import notes from "./routes/notes_routes.js"
import users from "./routes/users_routes.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

const CONNECTION_URL = process.env.QUICKNOTE_DB_URL
const PORT = process.env.PORT

mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
    .catch((e) => console.log(e.message))

mongoose.set('useFindAndModify', false)

app.use("/notes", notes)
app.use("/users", users)
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }))

export default app