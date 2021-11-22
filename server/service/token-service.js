import jwt from "jsonwebtoken"
import pool from "../db.js"



class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '60d' })
        return { accessToken, refreshToken }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await pool.query(
            `SELECT * FROM tokens WHERE user_id = $1`, [userId]
        )
        if (tokenData.rows.length) {
            await pool.query(`UPDATE tokens SET refresh_token = $1 WHERE user_id = $2`, [refreshToken, userId])
            return null
        }
        const newToken = await pool.query(
            `INSERT INTO tokens(user_id, refresh_token) 
                VALUES($1, $2) RETURNING *`, [userId, refreshToken])
        return newToken
    }
    async removeToken(refreshToken) {
        console.log(refreshToken);
        const tokenData = await pool.query(
            `DELETE FROM tokens WHERE refresh_token = $1 RETURNING *`, [refreshToken])
        return tokenData.rows[0]
    }
    async findToken(refreshToken) {
        const tokenData = await pool.query(
            `SELECT * FROM tokens WHERE refresh_token = $1`, [refreshToken])
        return tokenData.rows[0]
    }
}

export default new TokenService