import { compare, hash } from 'bcrypt'
import tokenService from "../service/token-service.js"
import pool from "../db.js"
import { ApiError } from '../exceptions/api.error.js'

class AuthService {
    async registration(login, password, role = "user") {
        const [candidate] = await pool.query(
            `SELECT * FROM users WHERE login = ?`, [login]
        )
        if (candidate.length) {
            throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`)
        }
        const hashPassword = await hash(password, 3)
        console.log(login, hashPassword, role);
        const [user] = await pool.query(
            `INSERT INTO users( login, password, role ) 
                VALUES(?, ?, ?)`, [login, hashPassword, role])
        const { insertId: id } = user
        const tokens = tokenService.generateTokens({ id, login, role })
        return {...tokens, user: { id, login, role } }
    }
    async login(login, password) {
        const [candidate] = await pool.query(
            `SELECT * FROM users WHERE login = ?`, [login]
        )
        if (!candidate.length) {
            throw ApiError.BadRequest(`Пользователя с логином ${login} не существует`)
        }

        const isPassEquals = await compare(password, candidate[0].password)
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const { id, role } = candidate[0]
        const tokens = tokenService.generateTokens({ id, login, role })
        return {...tokens, user: { id, login, role } }
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError('Пользователь не авторизован')
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData) {
            throw ApiError.UnauthorizedError('Пользователь не авторизован')
        }
        const { id, login, role } = userData
        const tokens = tokenService.generateTokens({ id, login, role })
        return {...tokens, user: { id, login, role } }
    }

}

export default new AuthService