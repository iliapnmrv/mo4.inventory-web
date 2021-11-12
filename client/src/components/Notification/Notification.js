import React, {useState, useEffect} from 'react'

export default function Notification(props) {

    const [width, setWidth] = useState(0)
    const [intervalId, setIntervalId] = useState()

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev)=>{
                if (prev<100) {
                   return prev+0.5
                }
                return prev
            })
        }, 20);
        setIntervalId(id)
    } 

    const handlePauseTimer = () => {
        clearInterval(intervalId)
    }

    useEffect(() => {
        handleStartTimer()
    }, [])

    return (
        <div className={`notification-item ${props.type === 'SUCCESS' ? 'success' : 'error'}`}>
            <p>{props.message}</p>
            <div className="bar" style={{width: `${width}%`}}></div>
        </div>
    )
}
