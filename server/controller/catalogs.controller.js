import { catalogsNames } from "../constants/constants.js"
import pool from "../db.js"
import catalogService from "../service/catalog-service.js"

class catalogsController {
    async deleteStatus(req, res) {
        try {
            const { id } = req.params
            const statusData = await catalogService.deleteCalatog(id, "status")
            res.json(statusData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async deleteStorage(req, res) {
        try {
            const { id } = req.params
            const storageData = await catalogService.deleteCalatog(id, "storage")
            res.json(storageData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async deletePerson(req, res) {
        try {
            const { id } = req.params
            const personData = await catalogService.deleteCalatog(id, "person")
            res.json(personData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async deleteOwner(req, res) {
        try {
            const { id } = req.params
            const ownerData = await catalogService.deleteCalatog(id, "owner")
            res.json(ownerData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async setStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body
            const statusData = await catalogService.setCalatog(id, status, "status")
            res.json(statusData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async setStorage(req, res) {
        try {
            const { id } = req.params
            const { storage } = req.body
            const storageData = await catalogService.setCalatog(id, storage, "storage")
            res.json(storageData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async setPerson(req, res) {
        try {
            const { id } = req.params
            const { person } = req.body
            const personData = await catalogService.setCalatog(id, person, "person")
            res.json(personData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
    async setOwner(req, res) {
        try {
            const { id } = req.params
            const { owner } = req.body
            const ownerData = await catalogService.setCalatog(id, owner, "owner")
            res.json(ownerData).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }

    async getStatuses(req, res) {
        console.log('status');
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

    async checkCatalog(req, res) {
        try {
            const { name, id } = req.params
            console.log(`SELECT ${name}_qr FROM ${catalogsNames[name]} WHERE ${name} = ${id}`);
            const [all] = await pool.query(`SELECT ${name}_qr FROM ${catalogsNames[name]} WHERE ${name} = ${id}`)
            res.json(all).status(200)
        } catch (e) {
            res.json(e.message)
        }
    }
}

export default new catalogsController