import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { changeItemData, changeNewItemData, setFilters } from "store/actions/totalAction";

const useForm = (initial, formName = "itemData") => {
    const [values, setValues] = useState(initial)
    const dispatchTotal = useDispatch();

    return {
        values,
        changeHandler: e => {
            // console.log(e);
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        },
        selectChangeHandler: e => {
            setValues({
                ...values,
                [e.name]: e.value
            })
            if (formName === "itemData") {
                dispatchTotal(changeItemData({
                    [e.name]: e.value
                }))
            } else {
                dispatchTotal(changeNewItemData({
                    [e.name]: e.value
                }))
            }

        },
        filtersChangeHandler: e => {
            dispatchTotal(setFilters({
                [e.name]: e.value
            }))
        },
        setDefault: data => data ? setValues(data) : null,
        changeInRedux: e => dispatchTotal(changeItemData({
            [e.target.name]: e.target.value
        })),
        changeNewItemInRedux: e => dispatchTotal(changeNewItemData({
            [e.target.name]: e.target.value
        })),
    }
}

export default useForm