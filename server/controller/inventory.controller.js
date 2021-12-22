import pool from "../db.js"
import csv from 'csvtojson'
import fetch from 'node-fetch';
import { SERVER } from "../constaints/constaints.js";

class inventoryController {
    async getInventory(req, res) {
        const [inv] = await pool.query('SELECT * FROM inventory')
        if (inv.length) {
            res.json(inv)
        } else {
            res.json(null)
        }
    }
    async deleteInventory(req, res) {
        try {
            await pool.query('TRUNCATE TABLE inventory')
            res.json("Успешно удалено")
        } catch (e) {
            console.log(e)
        }

    }
    async uploadInventory(req, res) {
        try {
            let filedata = req.file;
            const csvFilePath = filedata.path

            let length = await csv()
                .fromFile(csvFilePath)
                .then(async(json) => {
                    for (let i = 0; i < json.length; i++) {
                        let obj = json[i]
                        const response = await fetch(`${SERVER}/api/inventory`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(obj)
                        })
                    }
                    return json.length
                })
            res.send(`Успешно загружено ${length} строк`);
        } catch (e) {
            console.log(e)
        }

    }
    async createInventory(req, res) {
        try {
            const { vedPos, name, place, kolvo, placePriority } = req.body
            await pool.query(
                `INSERT INTO inventory( vedPos, name, place, kolvo, placePriority ) 
                        VALUES(?, ?, ?, ?, ?)`, [vedPos, name, place, kolvo, placePriority]
            )
            res.json(`Загружено`)
        } catch (e) {
            res.json(e.message)
        }

    }
}

export default new inventoryController