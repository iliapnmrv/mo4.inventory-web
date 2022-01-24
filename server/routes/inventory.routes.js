import { Router } from "express";
const router = Router()
import multer from "multer";

import inventoryController from "../controller/inventory.controller.js";
const storage = multer.diskStorage({
    destination: './public/inventory/',
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage })


router.get('/', inventoryController.getInventory)
router.post('/upload', upload.single("csv"), inventoryController.uploadInventory)

export default router