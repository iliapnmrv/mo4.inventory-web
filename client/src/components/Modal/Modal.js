import React, {useState, useEffect} from 'react'
import './Modal.css'

export default function Modal(props) {

    const [data, setData] = useState([])


    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/${props.editId}`)
            const jsonData = await response.json()
            setData(jsonData)
        } catch (e) {
           console.error(e.message); 
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(props.visible, props.editId);
    return (
        props.visible ? (
            <>
                <div className="modal-container">
                    <div className="md-modal">
                        <div className="md-content">
                            <h3>QR</h3>
                            <div>
                                <p>Текст</p>
                                <button className="md-close">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
        
    )
}
