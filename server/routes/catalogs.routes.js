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
router.delete('/status/:id', catalogsController.deleteStatus)
router.delete('/storage/:id', catalogsController.deleteStorage)
router.delete('/person/:id', catalogsController.deletePerson)
router.delete('/owner/:id', catalogsController.deleteOwner)
router.get('/checkCatalog/:name/:id', catalogsController.checkCatalog)


export default router