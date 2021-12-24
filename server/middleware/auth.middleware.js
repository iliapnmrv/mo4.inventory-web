import tokenService from "../service/token-service.js";

export const isLoggedin = (req, res, next) => {
    try {

        const { authorization } = req.headers
        if (!authorization) {
            res.status(403).json("Пользователь не авторизован")
            return
        }
        const token = authorization.split(' ')[1]
        if (!token) {
            throw new Error("Токен отсутствует")
        }
        const userData = tokenService.validateAccessToken(token)
        if (!userData) {
            throw new Error("Пользователь не авторизован")
        }
        req.user = userData
        next()

    } catch (e) {
        console.log(e.message);
        res.json(e.message)
    }
}