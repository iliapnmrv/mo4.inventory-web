import { CHANGE_ITEMINFOID, TOGGLE_DELETE_DIALOG, TOGGLE_FILTERS_MODAL, TOGGLE_ITEMINFO_MODAL, TOGGLE_NEWITEM_MODAL, TOGGLE_SAVE_DIALOG } from "store/actions/modalAction";

const defaultState = {
    filtersModal: false,
    newItem: false,
    itemInfo: false,
    deleteDialog: {
        visible: false,
    },
    saveDialog: {
        visible: false,
    },
    itemInfoId: 0,
};

export const modalReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case TOGGLE_FILTERS_MODAL:
            return {...state, filtersModal: payload };
        case TOGGLE_NEWITEM_MODAL:
            return {...state, newItem: payload };
        case TOGGLE_ITEMINFO_MODAL:
            return {...state, itemInfo: payload };
        case TOGGLE_SAVE_DIALOG:
            return {...state, saveDialog: {...state.saveDialog, ...payload } };
        case TOGGLE_DELETE_DIALOG:
            return {...state, deleteDialog: {...state.deleteDialog, ...payload } };
        case CHANGE_ITEMINFOID:
            return {...state, itemInfoId: payload };
        default:
            return state;
    }
};