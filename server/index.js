import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";
import totalRouter from "./routes/total.routes.js";
import infoRouter from "./routes/info.routes.js";
const app = express()
import cors from 'cors'
import pool from './db.js'
import multer from 'multer'
import csv from 'csvtojson'
import fetch from 'node-fetch';

app.use(cors())
app.use(express.json())

app.use('/api/inventory', inventoryRoutes)
app.use('/api/total', totalRouter)
app.use('/api', infoRouter)


app.use(multer({ dest: "uploads" }).single("csv"));
app.post("/upload/inventory", async(req, res) => {

    const response = await fetch("http://localhost:8000/api/inventory", {
        method: "DELETE",
    })

    let filedata = req.file;
    const csvFilePath = filedata.path
    csv()
        .fromFile(csvFilePath)
        .then(async(json) => {
            for (let i = 0; i < json.length; i++) {
                let obj = json[i]
                const response = await fetch("http://localhost:8000/api/inventory", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj)
                })
            }
        })
    res.send("Файл успешно загружен");
});


app.listen(8000, () => {
    console.log("runnin");
})