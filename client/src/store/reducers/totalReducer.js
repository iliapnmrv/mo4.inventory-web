import { CHANGE_ITEM_DATA, CHANGE_TOTAL_DATA, INITIAL_ITEM_DATA, SET_FILTERS } from "store/actions/totalAction";

const defaultState = {
    data: [],
    initialItemData: [],


    itemValues: {
        qr: "",
        name: "",
        sredstvo: "",
        type: "",
        month: "",
        year: "",
        model: "",
        sernom: "",
        info: "",
        status: "",
        person: "",
        storage: "",
        addinfo: "",
        owner: "",
    },
    filters: {
        sredstvo: [],
        type: [],
        status: [],
        person: [],
        storage: [],
        owner: [],
    },
};


export const totalReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case CHANGE_TOTAL_DATA:
            return {...state, data: payload };
        case INITIAL_ITEM_DATA:
            return {...state, initialItemData: payload };
        case CHANGE_ITEM_DATA:
            return {...state, itemValues: {...state.itemValues, ...payload } };
        case SET_FILTERS:
            return {...state, filters: {...state.filters, ...payload } };
        default:
            return state;
    }
};