import React, {Fragment, useEffect, useState} from 'react'
import './Select.css'
import Select from 'react-select'

export default function SelectInput(props) {

    const [types, setTypes] = useState([])

    const onItemSelect = (e) => {
        let out = {
            name: props.name,
            value: e.value
        }
        props.onSelectChange(out)
    }

    const getTypes = async () => {
        try {
            const response = await fetch("http://localhost:8000/types")
            const jsonData = await response.json()
            setTypes(jsonData.map(row => ({ 
                label: `${row.type_id} - ${row.type_name}`,
                value: row.type_id
            })))
        } catch (e) {
           console.error(e.message); 
        }
    } 

    useEffect(() => {
        getTypes()
    }, [])

    return (
        <Fragment>
            <label className={`w-${props.width} form-item`}>
                <span>{props.span}</span>
                <Select options={types} placeholder="Выберите тип устройства" onChange={(e)=>{onItemSelect(e)}}/>
            </label>
        </Fragment>
    )
}
