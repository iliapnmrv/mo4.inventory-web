import pool from "../db.js"
import totalService from "../service/total-service.js"
class totalController {
    async analyzeTotal(req, res) {
        const [inv] = await pool.query('SELECT qr, name, model, sernom FROM total')
        if (inv.length) {
            res.json(inv)
        } else {
            res.json(null)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            const [el] = await pool.query(`
            SELECT 
                total.qr,
                total.name,
                total.sredstvo,
                total.type,
                total.month,
                total.year,
                total.model, 
                total.sernom,
                persons.person,
                storages.storage,
                statuses.status,
                info.info
            FROM total 
                LEFT JOIN info
                    ON total.qr = info.info_qr
                LEFT JOIN statuses
                    ON total.qr = statuses.status_qr
                LEFT JOIN storages
                    ON total.qr = storages.storage_qr
                LEFT JOIN persons
                    ON total.qr = persons.person_qr
                WHERE total.qr = ?
                ORDER BY total.qr ASC
            `, [id])
            res.json(el[0])
        } catch (e) {
            res.json(e.message)
        }
    }

    async createOne(req, res) {
        try {
            const { qr, sredstvo, type, month, year, name, model, sernom } = req.body
            const data = await pool.query(
                `INSERT INTO total(qr, sredstvo, type, month, year, name, model, sernom) 
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [qr, sredstvo, type, month, year, name, model, sernom]
            )
            res.json(`Успешно добавлено, QR код: ${qr}`)
        } catch (e) {
            res.json(e.message)
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            await pool.query('DELETE FROM total WHERE qr = ?', [id])
            res.json(`Позиция удалена, QR код: ${id}`)
        } catch (e) {
            res.json(e.message)
        }
    }

    async updateOne(req, res) {
        try {
            const { qr, sredstvo, type, month, year, name, model, sernom } = req.body
            const data = await pool.query(
                'UPDATE total SET qr = ?, sredstvo = ?, type = ?, month = ?, year = ?, name = ?, model = ?, sernom = ? WHERE qr = ?', [qr, sredstvo, type, month, year, name, model, sernom, qr]
            )
            res.json(`Успешно обновлено, QR код: ${qr}`)
        } catch (e) {
            res.json(e.message)
        }
    }

    async filterTotal(req, res) {
        try {
            const whereClause = totalService.createFilters(req.query)

            const [filtered] = await pool.query(`
            SELECT * FROM total 
                LEFT JOIN types
                    ON total.type = types.type_id
                LEFT JOIN sredstva
                    ON total.sredstvo = sredstva.sredstvo_id
                LEFT JOIN statuses
                    ON total.qr = statuses.status_qr
                LEFT JOIN storages
                    ON total.qr = storages.storage_qr
                LEFT JOIN persons
                    ON total.qr = persons.person_qr
                ${whereClause}
                ORDER BY total.qr ASC
            `)
            res.json(filtered)
        } catch (e) {
            console.log(e.message);
        }
    }

    async checkSerialNum(req, res) {
        const { num } = req.params
        const [item] = await pool.query(`
        SELECT * FROM total
            WHERE sernom = ?
        `, [num])
        if (item.length) {
            res.status(200)
            res.json(true)
        } else {
            res.status(404)
            res.json(false)
        }


    }

    async getAll(req, res) {
        const [all] = await pool.query(`
        SELECT * FROM total 
            LEFT JOIN types
                ON total.type = types.type_id
            LEFT JOIN sredstva
                ON total.sredstvo = sredstva.sredstvo_id
            ORDER BY total.qr ASC`)
        res.json(all)
    }

}

export default new totalController