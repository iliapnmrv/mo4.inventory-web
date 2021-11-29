const defaultState = {
    regVisible: false,
    loginVisible: false,
};

export const authReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "TOGGLE_LOGIN_MODAL":
            console.log({...state, loginVisible: payload });
            return {...state, loginVisible: payload };
        case "TOGGLE_REG_MODAL":
            console.log({...state, regVisible: payload });
            return {...state, regVisible: payload };
        default:
            return state;
    }
};