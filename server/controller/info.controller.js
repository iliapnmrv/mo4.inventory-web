import pool from "../db.js"

class infoController {
    async setInfo(req, res) {
        try {
            const { id } = req.params
            const { info } = req.body

            if (info != null) {
                const [newInfo] = await pool.query(
                    `INSERT INTO info (info_qr, info) 
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE info = ?`, [id, info, info]
                )
                return res.json(newInfo)
            }
            res.json('Отсутствует дополнительная информация')
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async setAdditionalInfo(req, res) {
        try {
            const { id } = req.params
            const { addinfo } = req.body

            if (addinfo != null) {
                const [newInfo] = await pool.query(
                    `INSERT INTO additional_info (addinfo_qr, addinfo) 
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE addinfo = ?`, [id, addinfo, addinfo]
                )
                return res.json(newInfo)
            }
            res.json('Отсутствует дополнительная информация')
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }
    }

    async setPerson(req, res) {
        try {
            const { id } = req.params
            const { person } = req.body
            console.log(person);
            if (person) {
                const [newPerson] = await pool.query(
                    `INSERT INTO persons (person_qr, person) 
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE person = ?`, [id, person, person]
                )
                return res.json(newPerson)
            }
            res.json('Отсутствует информация о МОЛ')
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }

    }
    async setStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            if (status) {
                const [newStatus] = await pool.query(
                    `INSERT INTO statuses (status_qr, status) 
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE status = ?`, [id, status, status]
                )
                return res.json(newStatus)
            }
            res.json('Отсутствует информация о статусе')
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }
    }

    async setStorage(req, res) {
        try {
            const { id } = req.params
            const { storage } = req.body

            if (storage) {
                const [newStorage] = await pool.query(
                    `INSERT INTO storages (storage_qr, storage) 
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE storage = ?`, [id, storage, storage]
                )
                return res.json(newStorage)
            }
            res.json('Отсутствует информация о месте хранения')
            res.status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
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

    async getSredstva(req, res) {
        const [all] = await pool.query(`SELECT * FROM sredstva ORDER BY sredstvo_name`)
        res.json(all)
    }
    async getTypes(req, res) {
        const [all] = await pool.query(`SELECT * FROM types ORDER BY type_name`)
        res.json(all)
    }
    async getStatuses(req, res) {
        const [all] = await pool.query(`SELECT * FROM status_catalog ORDER BY status_name`)
        res.json(all)
    }
    async getStorages(req, res) {
        const [all] = await pool.query(`SELECT * FROM storage_catalog ORDER BY storage_name`)
        res.json(all)
    }
    async getPersons(req, res) {
        const [all] = await pool.query(`SELECT * FROM person_catalog ORDER BY person_name`)
        res.json(all)
    }
    async getOwners(req, res) {
        const [all] = await pool.query(`SELECT * FROM owner_catalog ORDER BY owner_name`)
        res.json(all)
    }
    async getNames(req, res) {
        const [all] = await pool.query(`SELECT DISTINCT name from total ORDER BY name`)
        res.json(all)
    }
}

export default new infoController