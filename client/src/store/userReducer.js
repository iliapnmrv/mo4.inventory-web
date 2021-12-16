const defaultState = {
    username: { id: 0, login: "guest", role: "guest" },
};

export const userReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_USER_DATA":
            return {...state, username: payload };
        default:
            return state;
    }
};