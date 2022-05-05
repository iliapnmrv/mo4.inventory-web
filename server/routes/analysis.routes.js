import { Router } from "express";
const router = Router()

import analysisController from "../controller/analysis.controller.js";

router.post('/total', analysisController.getTotalOne)
router.post('/inventory', analysisController.getInventoryOne)
router.post('/', analysisController.getAnalysisOne)

router.get('/total', analysisController.analyzeTotal)
router.get('/inventory', analysisController.analyzeInventory)
router.get('/rawData', analysisController.getAnalysisAllRawData)
router.get('/', analysisController.getAnalysisAll)

export default router