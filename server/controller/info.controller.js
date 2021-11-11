import pool from "../db.js"

class infoController {
    async createItemInfo(req, res) {
        const { id } = req.params
        const { info } = req.body
        const newInventory = await pool.query(
            `INSERT INTO info (info_qr, info) 
            VALUES ($1, $2)
            ON CONFLICT (info_qr) DO UPDATE 
              SET info = $2 RETURNING *`, [id, info]
        )
        res.json(newInventory.rows)
    }
    async setStatus(req, res) {
        const { id } = req.params
        const { status } = req.body
        const newStatus = await pool.query(
            `INSERT INTO statuses (status_qr, status) 
            VALUES ($1, $2)
            ON CONFLICT (status_qr) DO UPDATE 
              SET status = $2 RETURNING *`, [id, status]
        )
        res.json(newStatus.rows)
    }
    async getSredstva(req, res) {
        const all = await pool.query(`SELECT * FROM sredstva`)
        res.json(all.rows)
    }
    async getTypes(req, res) {
        const all = await pool.query(`SELECT * FROM types`)
        res.json(all.rows)
    }
    async getStatuses(req, res) {
        const all = await pool.query(`SELECT * FROM status_catalog`)
        res.json(all.rows)
    }
}

export default new infoController