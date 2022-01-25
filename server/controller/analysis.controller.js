import pool from "../db.js"
import { SERVER } from "../constants/constants.js";
import AnalysisService from "../service/analysis-service.js";


class analysisController {
    async getAnalysisAllRawData(req, res) {
        const { authorization } = req.headers
        const totalAnalysisData = await AnalysisService.fetchRequest(`${SERVER}api/analysis/total`, authorization)
        const inventoryAnalysisData = await AnalysisService.fetchRequest(`${SERVER}api/analysis/inventory`, authorization);
        // console.log(inventoryAnalysisData);
        const basis = inventoryAnalysisData.map((invObj) => {
            return {...invObj, kolvo: 0 }
        });
        // из документооборота вычитается инвентаризация, 
        // нельзя иметь пустой массив, обязательно создавать пустой
        //  объект несуществующего в документообороте предмета
        const newObj = [...totalAnalysisData, ...basis];
        const joined = await AnalysisService.countMultiple(newObj)
        const response = {
            "inStock": joined,
            "listed": inventoryAnalysisData
        }
        res.json(response)
    }

    async getAnalysisAll(req, res) {
        const { authorization } = req.headers
        const { listed, inStock } = await AnalysisService.fetchRequest(`${SERVER}api/analysis/rawData`, authorization)
            // console.log(listed, inStock);

        listed.forEach(o => {
            delete Object.assign(o, {
                "listedKolvo": o["kolvo"]
            })["kolvo"];
        })

        const mergeByName = (a1, a2) =>
            a1.map(itm => ({
                ...a2.find((item) => (item.name === itm.name) && item),
                ...itm
            }));

        const response = mergeByName(inStock, listed).map(item => {
            if (!(item.hasOwnProperty('listedKolvo'))) {
                return {...item, "listedKolvo": 0 }
            }
            return item
        })

        res.json(response)
    }

    async getAnalysisOne(req, res) {
        const { name } = req.params
        const { authorization } = req.headers
        let totalAnalysisData = await AnalysisService.fetchRequest(`${SERVER}api/analysis/total/${name}`, authorization)
        let [inventoryAnalysisData] = await AnalysisService.fetchRequest(`${SERVER}api/analysis/inventory/${name}`, authorization);

        if (!totalAnalysisData.length && !inventoryAnalysisData) {
            res.json("Предмета с таким наименованием не сущетсвует")
            return
        }

        // из документооборота вычитается инвентаризация, 
        // нельзя иметь пустой массив, обязательно создавать пустой объект 
        if (!totalAnalysisData.length) {
            totalAnalysisData = [{
                name: inventoryAnalysisData.name,
                kolvo: 0,
            }]
        } else {
            totalAnalysisData.forEach((invObj) => {
                invObj.kolvo = 1;
            });
        }
        let [inStock] = await AnalysisService.countOne(totalAnalysisData)
        const response = {
            "inStock": inStock,
            "listed": inventoryAnalysisData
        }
        res.json(response);
    }

    async analyzeTotal(req, res) {
        const [total] = await pool.query('SELECT name FROM total')
        total.forEach((invObj) => {
            invObj.kolvo = 1;
        });
        let joinedAmount = await AnalysisService.countOne(total)
        res.json(joinedAmount)
    }
    async analyzeInventory(req, res) {
        const [inv] = await pool.query('SELECT name, kolvo FROM inventory')
        let joinedAmount = await AnalysisService.countOne(inv)
        res.json(joinedAmount)
    }
    async getTotalOne(req, res) {
        const { name } = req.params
        const [total] = await pool.query('SELECT name FROM total WHERE name = ?', [name])
        if (!total.length) res.status(404)
        res.json(total)
    }
    async getInventoryOne(req, res) {
        const { name } = req.params
        const [inv] = await pool.query('SELECT name, kolvo FROM inventory WHERE name = ?', [name])
        if (!inv.length) res.status(404)
        res.json(inv)
    }
}

export default new analysisController