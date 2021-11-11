import { useState } from "react"

const useForm = (initial) => {
    console.log(initial);
    const [values, setValues] = useState(initial)

    return {
        values,
        changeHandler: e => setValues({
            ...values,
            [e.target.id]: e.target.value
        }),
    }
}

export default useForm