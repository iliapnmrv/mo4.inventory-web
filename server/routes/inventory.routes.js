import { Router } from "express";
const router = Router()

import inventoryController from "../controller/inventory.controller.js";

router.get('/', inventoryController.getInventory)
router.post('/', inventoryController.createInventory)
router.delete('/', inventoryController.deleteInventory)

export default router