export const TOGGLE_LOGIN_MODAL = "TOGGLE_LOGIN_MODAL"
export const TOGGLE_REG_MODAL = "TOGGLE_REG_MODAL"

export const toggleLoginModal = (payload) => {
    return {
        type: TOGGLE_LOGIN_MODAL,
        payload
    }
}
export const toggleRegModal = (payload) => {
    return {
        type: TOGGLE_REG_MODAL,
        payload
    }
}