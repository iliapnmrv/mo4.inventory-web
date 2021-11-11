import { useEffect, useState } from "react"

const usePostFetch = (url, data) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => {
                setIsSuccess(true)
                setMessage(res.json())
            })
    }, [url])

    return { message, isSuccess }
}

export default usePostFetch