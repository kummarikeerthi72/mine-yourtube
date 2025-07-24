// ===== index.js (Main Server File) =====
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import videoroutes from './Routes/video.js'
import userroutes from "./Routes/User.js"
import commentroutes from './Routes/comment.js'
import path from 'path'

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.get('/', (req, res) => {
    res.send("YourTube backend is working ✅")
})
app.use('/api/user', userroutes)
app.use('/api/video', videoroutes)
app.use('/api/comment', commentroutes)

// Database & Server
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(() => {
    console.log("✅ MongoDB connected")
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
}).catch((err) => {
    console.log("❌ MongoDB connection error:", err.message)
})