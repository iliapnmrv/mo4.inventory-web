import pool from "../db.js"

class inventoryController {
    async getInventory(req, res) {
        const inv = await pool.query('SELECT * FROM inventory')
        res.json(inv.rows)
    }
    async deleteInventory(req, res) {
        const inv = await pool.query('DELETE FROM inventory')
        res.json(inv.rows)
    }
    async createInventory(req, res) {
        const { id, vedPos, name, place, kolvo, placePriority } = req.body
        const newInventory = await pool.query(
            'INSERT INTO inventory( id, vedPos, name, place, kolvo, placePriority ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [id, vedPos, name, place, kolvo, placePriority]
        )
        res.json(newInventory.rows)
    }
}

export default new inventoryController