import pool from "../db.js"

class inventoryController {
    async getInventory(req, res) {
        const inv = await pool.query('SELECT * FROM inventory')
        if (inv.rows.length) {
            res.json(inv.rows)
        } else {
            res.json(null)
        }
    }
    async deleteInventory(req, res) {
        try {
            const inv = await pool.query('TRUNCATE TABLE inventory')
            res.json("Успешно удалено")
        } catch (e) {
            console.log(e)
        }

    }
    async createInventory(req, res) {
        try {
            const { vedPos, name, place, kolvo, placePriority } = req.body
            const newInventory = await pool.query(
                `INSERT INTO inventory( vedPos, name, place, kolvo, placePriority ) 
                                VALUES($1, $2, $3, $4, $5) RETURNING *`, [vedPos, name, place, kolvo, placePriority]
            )
            res.json(`Загружено`)
        } catch (e) {
            res.json(e.message)
        }

    }
}

export default new inventoryController