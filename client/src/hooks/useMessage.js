import { useEffect, useState } from "react"

const useMessage = (msg) => {
    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Произошла ошибка при получении данных: ', url)
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
            })
            .catch(e => {
                setError(e)
                console.log(e);
            })
            // console.log(url);
    }, [msg])

    return { data, isPending }
}

export default useMessage