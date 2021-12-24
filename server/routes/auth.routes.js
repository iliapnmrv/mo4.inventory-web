import { Router } from "express";
const router = Router()

import authController from "../controller/auth.controller.js";
import { isLoggedin } from "../middleware/auth.middleware.js";

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)
router.get('/users', isLoggedin, authController.getUsers)


export default router