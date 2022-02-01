import { Router } from "express";
const router = Router()

import catalogsController from "../controller/catalogs.controller.js";

router.get('/storages', catalogsController.getStorages)
router.get('/statuses', catalogsController.getStatuses)
router.get('/persons', catalogsController.getPersons)
router.get('/owners', catalogsController.getOwners)
router.post('/status/:id', catalogsController.setStatus)
router.post('/storage/:id', catalogsController.setStorage)
router.post('/person/:id', catalogsController.setPerson)
router.post('/owner/:id', catalogsController.setOwner)


export default router