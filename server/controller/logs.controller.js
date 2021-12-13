import pool from "../db.js"

class logsController {
    async createLog(req, res) {
        try {
            const { qr, user, text } = req.body
            const [log] = await pool.query(
                `INSERT INTO logs(qr, user, text, time) 
                            VALUES(?, ?, ?, current_timestamp)`, [qr, user, text]
            )
            res.json(`Успешно добавлено, QR код: ${log[0].qr}`)
        } catch (e) {
            res.json(e.message)
        }
    }
    async deleteLogs(req, res) {
        try {
            const { id } = req.params
            const [log] = await pool.query(`
            DELETE FROM logs 
                WHERE logs.qr = ?`, [id])
            res.json(log)
        } catch (e) {
            res.json(e.message)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            const [logs] = await pool.query(`
            SELECT * FROM logs 
                WHERE logs.qr = ?
                ORDER BY logs.qr ASC
            `, [id])
            res.json(logs)
        } catch (e) {
            res.json(e.message)
        }
    }
}

export default new logsController