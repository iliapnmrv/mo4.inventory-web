import React, {useEffect, useState} from 'react'
import Select from 'react-select'

export default function SelectInput(props) {

    const [value, setValue] = useState()

    const onItemSelect = (e) => {
        let out = {
            name: props.name,
            value: e.value
        }
        setValue(e.value)
        props.onSelectChange(out)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <>
            <label className='form-item'>
                <span className='required'>{props.span}</span>
                <Select 
                    options={props.data} 
                    placeholder={props.span} 
                    defaultValue={ props.default } 
                    onChange={(e)=>{onItemSelect(e)}}
                />
                <input
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ opacity: 0, height: 0 }}
                    value={value}
                    required={true}
                />
            </label>
        </>
    )
}
