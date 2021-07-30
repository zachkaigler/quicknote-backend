import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRET = process.env.SECRET

const auth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization
        if (!auth) return res.status(401).json({ error: "Unauthorized action. Please log in." })
        const token = auth.split(" ")[1]
        const decodedData = jwt.verify(token, SECRET)
        req.userId = decodedData?.id
        next()
    } catch (error) {
        console.log(error)
        next()
    }
}

export default auth