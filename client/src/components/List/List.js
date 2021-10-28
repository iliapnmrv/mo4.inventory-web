import React, {useEffect, useState} from 'react'
import './List.css'
import Item from '../Item/Item'
import Modal from '../Modal/Modal'


export default function List() {

    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [editId, setEditId] = useState()


    const getData = async () => {
        try {
            const response = await fetch("http://localhost:8000/")
            const jsonData = await response.json()
            setData(jsonData)
        } catch (e) {
           console.error(e.message); 
        }
    }

    const openModal = (id) => {
        document.body.style.overflow = 'hidden'
        setVisible(true)
        setEditId(id)
    }

    const closeModal = () => {
        document.body.style.overflow = 'auto'
        setVisible(false)
    }
    

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <div className="flex">
            <table>
                <thead>
                    <tr key={9999}>
                        <th>Номер QR</th>
                        <th>Ср-во</th>
                        <th>Тип</th>
                        <th>Месяц ввода</th>
                        <th>Год ввода</th>
                        <th>Наименование</th>
                        <th>Модель</th>
                        <th>Серийный номер</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => {
                        return(
                            <Item openModal={openModal} data={row} />
                        )
                    })}
                </tbody>
            </table>
            <Modal visible={visible} closeModal={closeModal} editId={editId} />
        </div>
    )
}
