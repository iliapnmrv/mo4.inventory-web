import { ApiError } from "../exceptions/api.error.js";
import tokenService from "../service/token-service.js";

export const isLoggedin = (req, res, next) => {
    try {
        console.log(123);
        const { authorization } = req.headers
        if (!authorization) {
            return next(ApiError.UnauthorizedError())
        }
        const token = authorization.split(' ')[1]
        if (!token) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(token)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()

    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}