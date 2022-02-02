import { Router } from "express";
const router = Router()
import multer from "multer";

import inventoryController from "../controller/inventory.controller.js";
const storage = multer.diskStorage({
    destination: './public/inventory/',
    filename: function(req, file, cb) {
        cb(null, file.originalname); // modified here  or user file.mimetype
    }
});
const upload = multer({ storage: storage })


router.get('/', inventoryController.getInventory)
router.get('/lastInventory', inventoryController.getLastInventory)
router.post('/upload', upload.single("csv"), inventoryController.uploadInventory)

export default router