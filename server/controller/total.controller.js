import pool from "../db.js"
import totalService from "../service/total-service.js"
class totalController {


    async getOne(req, res) {
        try {
            const { id } = req.params
            const el = await pool.query(`
            SELECT * FROM total 
                LEFT JOIN info
                    ON total.qr = info.info_qr
                LEFT JOIN statuses
                    ON total.qr = statuses.status_qr
                LEFT JOIN persons
                    ON total.qr = persons.person_qr
                WHERE total.qr = $1
                ORDER BY total.qr ASC
            `, [id])
            res.json(el.rows)
        } catch (e) {
            res.json(e.message)
        }
    }

    async createOne(req, res) {
        try {
            const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
            const item = await pool.query(
                `INSERT INTO total(qr, sredstvo, type_id, month, year, name, model, sernom) 
                            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [qr, sredstvo, type_id, month, year, name, model, sernom]
            )
            res.json(`Успешно добавлено, QR код: ${item.rows[0].qr}`)
        } catch (e) {
            res.json(e.message)
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            await pool.query('DELETE FROM total WHERE qr = $1', [id])
            res.json(`Позиция удалена, QR код: ${id}`)
        } catch (e) {
            res.json(e.message)
        }
    }

    async updateOne(req, res) {
        try {
            const { qr, sredstvo, type_id, month, year, name, model, sernom } = req.body
            const item = await pool.query(
                'UPDATE total SET qr = $1, sredstvo = $2, type_id = $3, month = $4, year = $5, name = $6, model = $7, sernom = $8 WHERE qr = $1 RETURNING *', [qr, sredstvo, type_id, month, year, name, model, sernom]
            )
            res.json(`Успешно обновлено, QR код: ${item.rows[0].qr}`)
        } catch (e) {
            res.json(e.message)
        }
    }

    async filterTotal(req, res) {
        try {
            const whereClause = totalService.createFilters(req.query)

            const filtered = await pool.query(`
            SELECT * FROM total 
                LEFT JOIN types
                    ON total.type_id = types.type_id
                LEFT JOIN sredstva
                    ON total.sredstvo = sredstva.sredstvo_id
                LEFT JOIN statuses
                    ON total.qr = statuses.status_qr
                LEFT JOIN persons
                    ON total.qr = persons.person_qr
                ${whereClause}
                ORDER BY total.qr ASC
            `)
            res.json(filtered.rows)
        } catch (e) {
            console.log(e.message);
        }
    }

    async getAll(req, res) {
        const all = await pool.query(`
        SELECT * FROM total 
            LEFT JOIN types
                ON total.type_id = types.type_id
            LEFT JOIN sredstva
                ON total.sredstvo = sredstva.sredstvo_id
            ORDER BY total.qr ASC`)
        res.json(all.rows)
    }

}

export default new totalController