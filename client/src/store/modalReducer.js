const defaultState = {
    filters: false,
    newItem: false,
    itemInfo: false,
    itemInfoId: 0,
};

export const modalReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "TOGGLE_FILTERS_MODAL":
            return {...state, filters: payload };
        case "TOGGLE_NEWITEM_MODAL":
            return {...state, newItem: payload };
        case "TOGGLE_ITEMINFO_MODAL":
            return {...state, itemInfo: payload };
        case "CHANGE_ITEMINFOID":
            return {...state, itemInfoId: payload };
        default:
            return state;
    }
};