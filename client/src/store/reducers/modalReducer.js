import { CHANGE_ITEMINFOID, TOGGLE_ANALYSIS_MODAL, TOGGLE_DELETE_DIALOG, TOGGLE_INVENTORY_RESULTS_MODAL, TOGGLE_ITEMINFO_MODAL, TOGGLE_NEWITEM_MODAL, TOGGLE_SAVE_DIALOG } from "store/actions/modalAction";

const defaultState = {
    inventoryResultsModal: false,
    analysisModal: false,
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
        case TOGGLE_INVENTORY_RESULTS_MODAL:
            return {...state, inventoryResultsModal: payload };
        case TOGGLE_ANALYSIS_MODAL:
            return {...state, analysisModal: payload };
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