import pool from "../db.js"


class CatalogService {
    async setCalatog(id, value, name) {
        if (value) {
            const [newItem] = await pool.query(
                `INSERT INTO ${name}_catalog (${name}_id, ${name}_name) 
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE ${name}_name = ?`, [id, value, value]
            )
            return newItem
        }
        return 'Информация отсутствует'
    }
    async deleteCalatog(id, name) {
        const [deletedItem] = await pool.query(
            `DELETE FROM ${name}_catalog WHERE ${name}_id = ?`, [id]
        )
        return 'Успешно удалено'
    }
}

export default new CatalogService