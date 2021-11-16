import { useState, useEffect } from "react"

const useForm = (initial) => {
    const [values, setValues] = useState(initial)

    return {
        values,
        changeHandler: e => setValues({
            ...values,
            [e.target.name]: e.target.value
        }),
        selectChangeHandler: e => {
            setValues({
                ...values,
                [e.name]: e.value
            })
        },
        setDefault: data => data ? setValues(data) : null
    }
}

export default useForm