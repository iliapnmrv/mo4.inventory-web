import pool from "../db.js"

class logsController {


    async createLog(req, res) {
        try {
            const { qr, user, text } = req.body
            const log = await pool.query(
                `INSERT INTO logs(qr, "user", text, time) 
                            VALUES($1, $2, $3, current_timestamp) RETURNING *`, [qr, user, text]
            )
            res.json(`Успешно добавлено, QR код: ${log.rows[0].qr}`)
        } catch (e) {
            res.json(e.message)
        }
    }
    async deleteLogs(req, res) {
        try {
            const { id } = req.params
            const el = await pool.query(`
            DELETE FROM logs 
                WHERE logs.qr = $1
            `, [id])
            res.json(el.rows)
        } catch (e) {
            res.json(e.message)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            const el = await pool.query(`
            SELECT * FROM logs 
                WHERE logs.qr = $1
                ORDER BY logs.qr ASC
            `, [id])
            res.json(el.rows)
        } catch (e) {
            res.json(e.message)
        }
    }
}

export default new logsController