import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, {useState, useEffect} from 'react'
import './Inventory.css'


export default function Inventory() {

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:8000/inventory")
            const jsonData = await response.json()
            setData(jsonData)
        } catch (e) {
           console.error(e.message); 
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleUpload = (e) => {
        const files = e.target.files
        const formData = new FormData()
        formData.append('csv', files[0])

        fetch('http://localhost:8000/upload/inventory', {
            method: 'POST',
            body: formData
        })
    }

    const toggleForm = () => {
        document.querySelector('.form').classList.toggle('slide')
        setOpen(!open)
    }
    
    return (
        <>
            <div className="header"  onClick={()=>{toggleForm()}}>
                <h2>Загрузить инвентаризацинную опись</h2>
                <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp}/>
            </div>
            <div className="uploader form">
                <label htmlFor="csv">Загрузить csv файл</label>
                <input accept=".csv" className="uploader" id="csv" onChange={(e)=>{handleUpload(e)}} type="file" />
            </div>
           
            <div className="flex">
                <table>
                    <thead>
                        <tr key={9999}>
                            <th>Позиция в ведомости</th>
                            <th>Наименование</th>
                            <th>Место</th>
                            <th>Количество</th>
                            <th>Приоритет</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => {
                            return(
                                <tr 
                                    key={row.id}
                                >
                                    <td>{row.vedpos}</td>
                                    <td>{row.name}</td>
                                    <td>{row.place}</td>
                                    <td>{row.kolvo}</td>
                                    <td>{row.placepriority}</td>
                                </tr> 
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
