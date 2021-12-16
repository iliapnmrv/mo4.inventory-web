import { Router } from "express";
const router = Router()

import totalController from "../controller/total.controller.js";

router.post('/filter/', totalController.filterTotal)
router.get('/', totalController.getAll)
router.get('/analyze/', totalController.analyzeTotal)
router.get('/checkSerialNum/:num', totalController.checkSerialNum)
router.get('/:id', totalController.getOne)
router.post('/', totalController.createOne)
router.put('/:id', totalController.updateOne)
router.delete('/:id', totalController.deleteOne)


export default router