import { Router } from "express";
const router = Router()

import infoController from "../controller/info.controller.js";

router.get('/types', infoController.getTypes)
router.get('/sredstva', infoController.getSredstva)
router.get('/statuses', infoController.getStatuses)
router.post('/status/:id', infoController.setStatus)
router.post('/info/:id', infoController.setInfo)


export default router