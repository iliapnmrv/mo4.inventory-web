import pool from "../db.js"

class catalogsController {
    async setStatus(req, res) {}
    async setStorage(req, res) {}
    async setPerson(req, res) {}
    async setOwner(req, res) {
        try {
            const { id } = req.params
            const { owner } = req.body

            if (owner) {
                const [newOwner] = await pool.query(
                    `INSERT INTO owners (owner_qr, owner) 
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE owner = ?`, [id, owner, owner]
                )
                return res.json(newOwner).status(200)
            }
            res.json('Отсутствует информация о владельце').status(200)
        } catch (e) {
            res.json(e.message)
        }
    }

    async getStatuses(req, res) {
        const [all] = await pool.query(`SELECT * FROM status_catalog`)
        res.json(all)
    }
    async getStorages(req, res) {
        const [all] = await pool.query(`SELECT * FROM storage_catalog`)
        res.json(all)
    }
    async getPersons(req, res) {
        const [all] = await pool.query(`SELECT * FROM person_catalog`)
        res.json(all)
    }
    async getOwners(req, res) {
        const [all] = await pool.query(`SELECT * FROM owner_catalog`)
        res.json(all)
    }
}

export default new catalogsController