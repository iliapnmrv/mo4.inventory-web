import { useState } from "react"

const usePostFetch = () => {

    const fetchData = async(url, data, method = 'POST') => {
        console.log(data, url);
        let message = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => data)
            .catch(e => {
                console.log(e);
            })
        const isSuccess = true
        console.log(message);

        return { message, isSuccess }
    }

    return fetchData
}

export default usePostFetch