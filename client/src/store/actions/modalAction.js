export const TOGGLE_ANALYSIS_MODAL = "TOGGLE_ANALYSIS_MODAL"
export const TOGGLE_NEWITEM_MODAL = "TOGGLE_NEWITEM_MODAL"
export const TOGGLE_ITEMINFO_MODAL = "TOGGLE_ITEMINFO_MODAL"
export const TOGGLE_SAVE_DIALOG = "TOGGLE_SAVE_DIALOG"
export const TOGGLE_DELETE_DIALOG = "TOGGLE_DELETE_DIALOG"
export const CHANGE_ITEMINFOID = "CHANGE_ITEMINFOID"

export const toggleAnalysisModal = (payload) => {
    return {
        type: TOGGLE_ANALYSIS_MODAL,
        payload
    }
}
export const toggleNewItemModal = (payload) => {
    return {
        type: TOGGLE_NEWITEM_MODAL,
        payload
    }
}
export const toggleItemInfoModal = (payload) => {
    return {
        type: TOGGLE_ITEMINFO_MODAL,
        payload
    }
}
export const toggleSaveDialog = (payload) => {
    return {
        type: TOGGLE_SAVE_DIALOG,
        payload
    }
}
export const toggleDeleteDialog = (payload) => {
    return {
        type: TOGGLE_DELETE_DIALOG,
        payload
    }
}
export const changeItemInfoId = (payload) => {
    return {
        type: CHANGE_ITEMINFOID,
        payload
    }
}