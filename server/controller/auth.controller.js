import pool from "../db.js"
import authService from "../service/auth-service.js"

class authController {
    async registration(req, res) {
        try {
            const { login, password } = req.body
            const userData = await authService.registration(login, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            res.json(e.message)
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body
            const userData = await authService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            res.json(e.message)
        }
    }
    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        } catch (e) {
            res.json(e.message)
        }
    }
    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(userData)
        } catch (e) {
            res.json(e.message)
        }
    }
    async getUsers(req, res) {
        try {
            const users = await pool.query('SELECT * FROM users')
            res.json(users.rows)
        } catch (e) {
            res.json(e.message)
        }
    }
}

export default new authController