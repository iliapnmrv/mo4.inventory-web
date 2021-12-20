const defaultState = {
    data: [],
    initialItemData: [],
    itemValues: {
        qr: "",
        name: "",
        sredstvo: "",
        type_id: "",
        month: "",
        year: "",
        model: "",
        sernom: "",
        info: "",
        status: "",
        person: "",
        storage: "",
    }
};


export const totalReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case "CHANGE_TOTAL_DATA":
            return {...state, data: payload };
        case "INITIAL_ITEM_DATA":
            return {...state, initialItemData: payload };
        case "CHANGE_ITEM_DATA":
            return {...state, itemValues: payload };;
        default:
            return state;
    }
};