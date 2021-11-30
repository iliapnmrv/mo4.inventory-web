import { Router } from "express";
const router = Router()

import logsController from "../controller/logs.controller.js";

router.post('/', logsController.createLog)
router.delete('/:id', logsController.deleteLogs)
router.get('/:id', logsController.getOne)

export default router