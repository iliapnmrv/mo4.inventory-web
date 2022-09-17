import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";
import totalRouter from "./routes/total.routes.js";
import infoRouter from "./routes/info.routes.js";
import authRouter from "./routes/auth.routes.js";
import logsRouter from "./routes/logs.routes.js";
import catalogsRouter from "./routes/catalogs.routes.js";
import analysisRouter from "./routes/analysis.routes.js";

import cors from 'cors'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
import errorMiddleware from "./middlewares/error.middleware.js";
import { isLoggedin } from "./middlewares/auth.middleware.js";


const app = express()

app.use(cors({
    origin: { CLIENT: process.env.CLIENT, CLIENT_MOBILE: process.env.CLIENT_MOBILE, SERVER: process.env.SERVER },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
    // Middlewares
app.use('/api/auth', authRouter)
app.use('/api/analysis', analysisRouter)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/total', totalRouter)
app.use('/api/catalogs', catalogsRouter)

app.use(isLoggedin)
app.use('/api/logs', logsRouter)
app.use('/api', infoRouter)
app.use(errorMiddleware)

app.listen(8000, () => {
    console.log("runnin");
})