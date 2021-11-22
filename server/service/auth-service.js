import { compare, hash } from 'bcrypt'
import tokenService from "../service/token-service.js"
import pool from "../db.js"

class AuthService {
    async registration(login, password) {
        const candidate = await pool.query(
            `SELECT * FROM users WHERE login = $1`, [login]
        )
        if (candidate.rows.length) {
            throw new Error(`Пользователь с логином ${login} уже существует`)
        }
        const hashPassword = await hash(password, 3)
        const user = await pool.query(
            `INSERT INTO users( login, password ) 
                VALUES($1, $2) RETURNING *`, [login, hashPassword])
        const { id } = user.rows[0]
        const tokens = tokenService.generateTokens({ id, login })
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user: { id, login } }
    }
    async login(login, password) {
        const candidate = await pool.query(
            `SELECT * FROM users WHERE login = $1`, [login]
        )
        if (!candidate.rows.length) {
            throw new Error(`Пользователя с логином ${login} не существует`)
        }

        const isPassEquals = await compare(password, candidate.rows[0].password)
        if (!isPassEquals) {
            throw new Error(`Неверный пароль`)
        }
        const { id } = candidate.rows[0]
        const tokens = tokenService.generateTokens({ id, login })
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user: { id, login } }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        console.log(refreshToken);
        if (!refreshToken) {
            throw new Error('Пользователь не авторизован')
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw new Error('Пользователь не авторизован')
        }
        console.log(tokenFromDb);
        const user = await pool.query(`SELECT * FROM users WHERE login = $1`, [tokenFromDb.id])
        const { id } = user.rows[0]
        const tokens = tokenService.generateTokens({ id, login })
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user: { id, login } }
    }

}

export default new AuthService