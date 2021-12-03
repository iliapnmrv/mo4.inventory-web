const defaultState = {
    data: []
};

export const totalReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_TOTAL_DATA":
            return {...state, data: payload };
            // case "TOGGLE_REG_MODAL":
            //     return {...state, regVisible: payload };
        default:
            return state;
    }
};