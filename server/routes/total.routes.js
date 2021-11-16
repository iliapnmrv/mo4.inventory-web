import { Router } from "express";
const router = Router()

import totalController from "../controller/total.controller.js";

router.get('/filter/', totalController.filterTotal)
router.get('/', totalController.getAll)
router.get('/:id', totalController.getOne)
router.post('/', totalController.createOne)
router.put('/:id', totalController.updateOne)
router.delete('/:id', totalController.deleteOne)


export default router