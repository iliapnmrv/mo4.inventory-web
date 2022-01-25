export const CHANGE_TOTAL_DATA = "CHANGE_TOTAL_DATA"
export const INITIAL_ITEM_DATA = "INITIAL_ITEM_DATA"
export const CHANGE_ITEM_DATA = "CHANGE_ITEM_DATA"
export const SET_FILTERS = "SET_FILTERS"
export const CHANGE_NEW_ITEM_DATA = "CHANGE_NEW_ITEM_DATA"

export const changeTotalData = (payload) => {
    return {
        type: CHANGE_TOTAL_DATA,
        payload
    }
}
export const changeInitialItemData = (payload) => {
    return {
        type: INITIAL_ITEM_DATA,
        payload
    }
}
export const changeItemData = (payload) => {
    return {
        type: CHANGE_ITEM_DATA,
        payload
    }
}
export const changeNewItemData = (payload) => {
    return {
        type: CHANGE_NEW_ITEM_DATA,
        payload
    }
}
export const setFilters = (payload) => {
    return {
        type: SET_FILTERS,
        payload
    }
}