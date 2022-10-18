import pool from "../db.js"
import { readdir } from 'fs/promises';
import csvtojson from 'csvtojson'
import { statSync } from "fs";
import fs from 'fs'
import path from 'path'
class inventoryController {
    async getInventory(req, res) {
        const [inv] = await pool.query('SELECT * FROM inventory')
        console.log(inv);
        if (inv.length) {
            res.json(inv)
        } else {
            res.json(null)
        }
    }
    async getLastInventory(req, res) {
        const getMostRecentFile = (dir) => {
            const files = orderReccentFiles(dir);
            return files.length ? files[0] : undefined;
        };

        const orderReccentFiles = (dir) => {
            return fs.readdirSync(dir)
                .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
                .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
                .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
        };
        res.json(getMostRecentFile('public/inventory'))
    }
    async uploadInventory(req, res) {
        try {
            await pool.query('TRUNCATE TABLE inventory')
            if (req.file == undefined) {
                res.status(501).send("Ошибка при загрузке");
                return
            }

            let filedata = req.file;

            const csvFilePath = filedata.path
            let length = await csvtojson({ "delimiter": ";" })
                .preFileLine((fileLineString, lineIdx) => {
                    let invalidLinePattern = /^['"].*[^"'];/;
                    if (invalidLinePattern.test(fileLineString)) {
                        fileLineString = "";
                        invalidLineCount++;
                    }
                    return fileLineString
                })
                .fromFile(csvFilePath)
                .then(async(json) => {
                    for (let i = 0; i < json.length; i++) {
                        const { vedpos, name, place, kolvo, placepriority } = json[i]
                        await pool.query(
                            `INSERT INTO inventory(vedpos, name, place, kolvo, placepriority) 
                             VALUES(?, ?, ?, ?, ?)`, [vedpos, name, place, kolvo, placepriority]
                        )
                    }
                    return json.length
                })
            res.send(`Успешно загружено ${length} строк`);
        } catch (e) {
            console.log(e)
        }
    }

    async uploadResult(req, res) {
            try {
                await pool.query('TRUNCATE TABLE inventory_result')
                const { inventory } = req.body
                console.log(inventory, inventory.length);
                if (inventory.length) {
                    const [inv] = await pool.query(`
                INSERT INTO inventory_result
                    ( id, inventoryNum, name, status, model, serialNum, position, place, trace )
                VALUES
                    ${inventory
                    ?.map(
                        item =>
                        `(${item.id}, '${item.inventoryNum.toString().slice(-5)}', '${item.name}', '${item.status}', '${item.model}', '${item.serialNum}', ${item.position}, '${item.place}', '${item.trace}')`,
                    )
                    .join(',\n')}`)
                    // console.log(inv); 
                }
               
                res.json(`Инвентаризация загружена на сервер, ${inventory.length} строк`)
        } catch (e) {
            console.error(e);
            return false
        }
    }

    async getInventoryResults(req, res){
        const [inv] = await pool.query(`
        SELECT total.name, total.qr, total.model, statuses.status, storages.storage, persons.person, owners.owner, total.month, total.year, total.sernom, total.type, total.sredstvo
            FROM total
            LEFT JOIN inventory_result ON inventory_result.inventoryNum = total.qr
            LEFT JOIN statuses
                    ON total.qr = statuses.status_qr
                LEFT JOIN storages
                    ON total.qr = storages.storage_qr
                LEFT JOIN persons
                    ON total.qr = persons.person_qr
                LEFT JOIN owners
                    ON total.qr = owners.owner_qr
            WHERE inventory_result.inventoryNum IS NULL`)

        // console.log('inv', inv);
        res.json(inv)
    }
}

export default new inventoryController