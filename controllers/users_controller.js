import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user_model.js"

dotenv.config()

const SECRET = process.env.SECRET

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        
        if (!user) return res.status(404).json({ error: "User not found." })

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if (!isPassCorrect) return res.status(400).json({ error: "Incorrect password." })

        const token = jwt.sign({ email: user.email, id: user._id }, SECRET, { expiresIn: "24hr" })

        res.status(200).json({ result: user, token })
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." })
    }
}

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const existingUser = await User.findOne({ email })
        
    if (existingUser) return res.status(400).json({ error: "User already exists." })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({ 
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
     })

     const token = jwt.sign({ email: user.email, id: user._id }, SECRET, { expiresIn: "24hr" })

     res.status(200).json({ user, token })
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}