import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";

const useForm = (initial) => {
    const [values, setValues] = useState(initial)
    const dispatchTotal = useDispatch();

    useEffect(() => {
        dispatchTotal({
            type: "CHANGE_ITEM_DATA",
            payload: values,
        })
    }, [values])


    return {
        values,
        changeHandler: e => {
            setValues({
                    ...values,
                    [e.target.name]: e.target.value
                })
                // dispatchTotal({
                //     type: "CHANGE_ITEM_DATA",
                //     payload: {
                //         [e.target.name]: e.target.value
                //     },
                // })
        },
        selectChangeHandler: e => {
            setValues({
                    ...values,
                    [e.name]: e.value
                })
                // dispatchTotal({
                //     type: "CHANGE_ITEM_DATA",
                //     payload: {
                //         [e.name]: e.value
                //     },
                // })
        },
        setDefault: data => data ? setValues(data) : null,
        resetForm: e => setValues(initial)
    }
}

export default useForm