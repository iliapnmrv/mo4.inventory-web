import pool from "../db.js"

class infoController {
    async setInfo(req, res) {
        try {
            const { id } = req.params
            const { info } = req.body

            if (info) {
                const newInfo = await pool.query(
                    `INSERT INTO info (info_qr, info) 
                    VALUES ($1, $2)
                    ON CONFLICT (info_qr) DO UPDATE 
                    SET info = $2 RETURNING *`, [id, info]
                )
                res.json(newInfo.rows)
            }
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }

    }
    async setStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body
            if (!status) {
                const newStatus = await pool.query(
                    `INSERT INTO statuses (status_qr, status) 
                    VALUES ($1, $2)
                    ON CONFLICT (status_qr) DO UPDATE 
                    SET status = $2 RETURNING *`, [id, status]
                )
                res.json(newStatus.rows)
            }
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }
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