import { Router } from "express";
const router = Router()

import authController from "../controller/auth.controller.js";

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)
router.get('/users', authController.getUsers)


export default router