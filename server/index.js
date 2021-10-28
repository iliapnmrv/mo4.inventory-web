import express from "express";
const app = express()
import cors from 'cors'
import pool from './db.js'

app.use(cors())
app.use(express.json())

app.get('/', async(req, res) => {
    try {
        const all = await pool.query(`
        SELECT * FROM total 
            LEFT JOIN types
                ON total.type_id = types.type_id
            LEFT JOIN sredstva
                ON total.sredstvo = sredstva.sredstvo_id
            ORDER BY total.qr ASC`)
        res.json(all.rows)
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


app.get('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const el = await pool.query('SELECT * FROM total WHERE qr = $1', [id])
        res.json(el.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.post('/', async(req, res) => {
    try {
        const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
        console.log(qr, sredstvo, type_id, month, year, name, model, sernom);
        const newInventory = await pool.query(
            'INSERT INTO total(qr, sredstvo, type_id, month, year, name, model, sernom) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [qr, sredstvo, type_id, month, year, name, model, sernom]
        )
        res.json(newInventory.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.get('/inventory', async(req, res) => {
    try {
        const inventory = await pool.query('SELECT * FROM inventory')
        res.json(inventory.rows)
    } catch (e) {
        console.error(e.message);
    }
})

app.listen(8000, () => {
    console.log("runnin");
})