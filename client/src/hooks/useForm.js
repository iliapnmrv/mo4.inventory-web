import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";

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
            dispatchTotal({
                type: "CHANGE_ITEM_DATA",
                payload: {
                    [e.name]: e.value
                },
            })
        },
        setDefault: data => data ? setValues(data) : null,
        changeInRedux: e => dispatchTotal({
            type: "CHANGE_ITEM_DATA",
            payload: {
                [e.target.name]: e.target.value
            },
        }),
    }
}

export default useForm