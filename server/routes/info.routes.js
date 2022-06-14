import { Router } from "express";
const router = Router()

import infoController from "../controller/info.controller.js";

router.get('/types', infoController.getTypes)
router.get('/sredstva', infoController.getSredstva)
router.get('/storages', infoController.getStorages)
router.get('/statuses', infoController.getStatuses)
router.get('/persons', infoController.getPersons)
router.get('/owners', infoController.getOwners)
router.get('/names', infoController.getNames)
router.post('/status/:id', infoController.setStatus)
router.post('/storage/:id', infoController.setStorage)
router.post('/info/:id', infoController.setInfo)
router.post('/addinfo/:id', infoController.setAdditionalInfo)
router.post('/person/:id', infoController.setPerson)
router.post('/owner/:id', infoController.setOwner)


export default router