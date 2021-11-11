import pool from "../db.js"

class totalController {
    async getAll(req, res) {
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
    }

    async getOne(req, res) {
        const { id } = req.params
        const el = await pool.query(`
        SELECT * FROM total 
            LEFT JOIN info
                ON total.qr = info.info_qr
            LEFT JOIN statuses
                ON total.qr = statuses.status_qr
            WHERE total.qr = $1
            ORDER BY total.qr ASC
        `, [id])
        res.json(el.rows)
    }

    async createOne(req, res) {
        const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
        const newInventory = await pool.query(
            `INSERT INTO total(qr, sredstvo, type_id, month, year, name, model, sernom) 
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [qr, sredstvo, type_id, month, year, name, model, sernom]
        )
        res.json(newInventory.rows)
    }

    async deleteOne(req, res) {
        const { id } = req.params
        const el = await pool.query('DELETE FROM total WHERE qr = $1', [id])
        res.json(el.rows)
    }

    async updateOne(req, res) {
        const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
        const newInventory = await pool.query(
            'UPDATE total SET qr = $1, sredstvo = $2, type_id = $3, month = $4, year = $5, name = $6, model = $7, sernom = $8 WHERE qr = $1 RETURNING *', [qr, sredstvo, type_id, month, year, name, model, sernom]
        )
        res.json(newInventory.rows)
    }

}

export default new totalController