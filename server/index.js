import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";
import totalRouter from "./routes/total.routes.js";
import infoRouter from "./routes/info.routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from 'cors'
import multer from 'multer'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(multer({ dest: "uploads" }).single("csv"));

app.use('/api/inventory', inventoryRoutes)
app.use('/api/total', totalRouter)
app.use('/api/auth', authRouter)
app.use('/api', infoRouter)

app.listen(8000, () => {
    console.log("runnin");
})