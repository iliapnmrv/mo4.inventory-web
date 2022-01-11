export const CHANGE_TOTAL_DATA = "CHANGE_TOTAL_DATA"
export const INITIAL_ITEM_DATA = "INITIAL_ITEM_DATA"
export const CHANGE_ITEM_DATA = "CHANGE_ITEM_DATA"

export const changeTotalData = (payload) => {
    return {
        type: CHANGE_TOTAL_DATA,
        payload
    }
}
export const initialItemData = (payload) => {
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