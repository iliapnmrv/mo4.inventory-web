import { Router } from "express";
const router = Router()

import inventoryController from "../controller/inventory.controller.js";

router.get('/', inventoryController.getInventory)
router.get('/analyze/', inventoryController.analyzeInventory)
router.post('/', inventoryController.createInventory)
router.post('/upload', inventoryController.uploadInventory)
router.delete('/', inventoryController.deleteInventory)

export default router