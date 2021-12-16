import { compare, hash } from 'bcrypt'
import tokenService from "../service/token-service.js"
import pool from "../db.js"

class AuthService {
    async registration(login, password, role = "user") {
        const [candidate] = await pool.query(
            `SELECT * FROM users WHERE login = ?`, [login]
        )
        if (candidate.length) {
            throw new Error(`Пользователь с логином ${login} уже существует`)
        }
        const hashPassword = await hash(password, 3)
        const [user] = await pool.query(
            `INSERT INTO users( login, password, role ) 
                VALUES(?, ?, ?)`, [login, hashPassword, role])
        const { id } = user
        const tokens = tokenService.generateTokens({ id, login })
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user: { id, login, role } }
    }
    async login(login, password) {
        const [candidate] = await pool.query(
            `SELECT * FROM users WHERE login = ?`, [login]
        )
        if (!candidate.length) {
            throw new Error(`Пользователя с логином ${login} не существует`)
        }

        const isPassEquals = await compare(password, candidate[0].password)
        if (!isPassEquals) {
            throw new Error(`Неверный пароль`)
        }
        const { id, role } = candidate[0]
            // console.log("candidate", candidate[0]);
        const tokens = tokenService.generateTokens({ id, login })
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user: { id, login, role } }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Пользователь не авторизован')
        }
        // console.log(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
            // console.log(tokenFromDb);
        if (!userData || !tokenFromDb) {
            throw new Error('Пользователь не авторизован')
        }
        const [user] = await pool.query(`SELECT * FROM users WHERE id = ?`, [tokenFromDb.user_id])
        const { id, login, role } = user[0]
        console.log(id, login);
        const tokens = tokenService.generateTokens({ id, login })
        await tokenService.saveToken(id, tokens.refreshToken)

        return {...tokens, user: { id, login, role } }
    }

}

export default new AuthService