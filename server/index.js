import express from "express";
const app = express()
import cors from 'cors'
import pool from './db.js'
import multer from 'multer'
import csv from 'csvtojson'
import fetch from 'node-fetch';

app.use(cors())
app.use(express.json())

app.get('/inventory', async(req, res) => {
    try {
        const inv = await pool.query('SELECT * FROM inventory')
        res.json(inv.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.delete('/inventory', async(req, res) => {
    try {
        const inv = await pool.query('DELETE FROM inventory')
        res.json(inv.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.use(multer({ dest: "uploads" }).single("csv"));
app.post("/upload/inventory", async(req, res) => {

    const response = await fetch("http://localhost:8000/inventory", {
        method: "DELETE",
    })

    let filedata = req.file;
    const csvFilePath = filedata.path
    csv()
        .fromFile(csvFilePath)
        .then(async(json) => {
            for (let i = 0; i < json.length; i++) {
                let obj = json[i]
                const response = await fetch("http://localhost:8000/inventory", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj)
                })
            }
        })
    res.send("Файл успешно загружен");
});

app.post('/inventory', async(req, res) => {
    try {
        const { id, vedPos, name, place, kolvo, placePriority } = req.body
        const newInventory = await pool.query(
            'INSERT INTO inventory( id, vedPos, name, place, kolvo, placePriority ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [id, vedPos, name, place, kolvo, placePriority]
        )
        console.log(newInventory.rows);
        res.json(newInventory.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.get('/types', async(req, res) => {
    try {
        const all = await pool.query(`SELECT * FROM types`)
        res.json(all.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.get('/sredstva', async(req, res) => {
    try {
        const all = await pool.query(`SELECT * FROM sredstva`)
        res.json(all.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.get('/', async(req, res) => {
    try {
        const all = await pool.query(`
        SELECT * FROM total 
            LEFT JOIN types
                ON total.type_id = types.type_id
            LEFT JOIN sredstva
                ON total.sredstvo = sredstva.sredstvo_id
            LEFT JOIN info
                ON total.qr = info.info_qr
            ORDER BY total.qr ASC`)
        res.json(all.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.get('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const el = await pool.query(`
        SELECT * FROM total 
            LEFT JOIN info
                ON total.qr = info.info_qr
            WHERE total.qr = $1
            ORDER BY total.qr ASC
        `, [id])
        res.json(el.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const el = await pool.query('DELETE FROM total WHERE qr = $1', [id])
        res.json(el.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.put('/:id', async(req, res) => {
    try {
        const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
        const newInventory = await pool.query(
            'UPDATE total SET qr = $1, sredstvo = $2, type_id = $3, month = $4, year = $5, name = $6, model = $7, sernom = $8 WHERE qr = $1 RETURNING *', [qr, sredstvo, type_id, month, year, name, model, sernom]
        )
        res.json(newInventory.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.put('/info/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { info } = req.body
        const newInventory = await pool.query(
            'UPDATE info SET info = $2 WHERE info_qr = $1 RETURNING *', [id, info]
        )
        res.json(newInventory.rows)
    } catch (e) {
        console.error(e.message);
    }
})


app.post('/info', async(req, res) => {
    try {
        const { qr, info } = req.body
        const date = Date.now()
        const newInventory = await pool.query(
            'INSERT INTO info(info_qr, info, date) VALUES($1, $2, $3) RETURNING *', [qr, info, date]
        )
        res.json(newInventory.rows)
    } catch (e) {
        console.error('error', e.message);
    }
})

app.post('/', async(req, res) => {
    try {
        const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
        const newInventory = await pool.query(
            'INSERT INTO total(qr, sredstvo, type_id, month, year, name, model, sernom) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [qr, sredstvo, type_id, month, year, name, model, sernom]
        )
        res.json(newInventory.rows)
    } catch (e) {
        console.error('error', e.message);
    }
})



app.listen(8000, () => {
    console.log("runnin");
})