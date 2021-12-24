import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";
import totalRouter from "./routes/total.routes.js";
import infoRouter from "./routes/info.routes.js";
import authRouter from "./routes/auth.routes.js";
import logsRouter from "./routes/logs.routes.js";
import analysisRouter from "./routes/analysis.routes.js";

import cors from 'cors'
import multer from 'multer'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { CLIENT, SERVER } from "./constaints/constaints.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { isLoggedin } from "./middlewares/auth.middleware.js";

dotenv.config()

const app = express()

app.use(cors({
    origin: { CLIENT, SERVER },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(multer({ dest: "uploads" }).single("csv"));
// Middlewares
app.use('/api/auth', authRouter)
    // app.use(isLoggedin)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/total', totalRouter)
app.use('/api/logs', logsRouter)
app.use('/api/analysis', analysisRouter)
app.use('/api', infoRouter)
app.use(errorMiddleware)

app.listen(8000, () => {
    console.log("runnin");
})