const defaultState = {
    data: [],
    initialItemData: [],
};

export const totalReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_TOTAL_DATA":
            return {...state, data: payload };
        case "INITIAL_ITEM_DATA":
            return {...state, initialItemData: payload };
        default:
            return state;
    }
};