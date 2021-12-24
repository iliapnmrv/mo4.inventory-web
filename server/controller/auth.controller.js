import pool from "../db.js"
import authService from "../service/auth-service.js"

class authController {
    async registration(req, res) {
        try {
            const { login, password } = req.body
            const userData = await authService.registration(login, password)
            res.cookie('refresh', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.status(201).json(userData)
        } catch (e) {
            res.status(409).json(e.message)
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body
            const userData = await authService.login(login, password)
            res.cookie('refresh', userData.refreshToken, { maxAge: 1000 * 60 * 15, httpOnly: true })
            res.json(userData)
        } catch (e) {
            res.status(400).json(e.message)
        }
    }
    async logout(req, res) {
        try {
            const { refresh } = req.cookies
            const token = await authService.logout(refresh)
            res.clearCookie('refresh')
            res.json(token)
        } catch (e) {
            res.json(e.message)
        }
    }
    async refresh(req, res) {
        try {
            const { refresh } = req.cookies
            const userData = await authService.refresh(refresh)
            res.cookie('refresh', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            res.json(e.message)
        }
    }
    async getUsers(req, res) {
        try {
            const [users] = await pool.execute('SELECT * FROM users')
            console.log(users);
            res.json(users)
        } catch (e) {
            res.json(e.message)
        }
    }
}

export default new authController