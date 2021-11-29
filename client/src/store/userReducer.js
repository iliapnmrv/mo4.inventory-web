const defaultState = {
    username: "guest",
};

export const userReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_USER_DATA":
            localStorage.setItem('username', payload)
            return {...state, username: payload };
        default:
            return state;
    }
};