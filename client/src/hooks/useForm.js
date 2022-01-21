import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { changeItemData, setFilters } from "store/actions/totalAction";

const useForm = (initial) => {
    const [values, setValues] = useState(initial)
    const dispatchTotal = useDispatch();

    return {
        values,
        changeHandler: e => {
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
            dispatchTotal(changeItemData({
                [e.name]: e.value
            }))
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
    }
}

export default useForm