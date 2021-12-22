import { Router } from "express";
const router = Router()

import analysisController from "../controller/analysis.controller.js";

router.get('/total/:name', analysisController.getTotalOne)
router.get('/inventory/:name', analysisController.getInventoryOne)
router.get('/total', analysisController.analyzeTotal)
router.get('/inventory', analysisController.analyzeInventory)
router.get('/', analysisController.getAnalysisAll)
router.get('/:name', analysisController.getAnalysisOne)





export default router