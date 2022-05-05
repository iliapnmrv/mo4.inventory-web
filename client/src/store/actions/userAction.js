export const CHANGE_USER_DATA = "CHANGE_USER_DATA"
export const SET_TOKEN = "SET_TOKEN"
export const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED"

export const changeUserData = (payload) => {
    return {
        type: CHANGE_USER_DATA,
        payload
    }
}
export const setToken = (payload) => {
    return {
        type: SET_TOKEN,
        payload: payload
    }
}
export const setIsAuthenticated = (payload) => {
    return {
        type: SET_IS_AUTHENTICATED,
        payload
    }
}