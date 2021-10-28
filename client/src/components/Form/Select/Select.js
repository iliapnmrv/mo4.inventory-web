import React, {Fragment, useEffect, useState} from 'react'
import './Select.css'
import Select from 'react-select'

export default function SelectInput(props) {

    const [value, setValue] = useState()

    const onItemSelect = (e) => {
        let out = {
            name: props.name,
            value: e.value
        }
        props.onSelectChange(out)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <Fragment>
            <label className='form-item'>
                <span>{props.span}</span>
                <Select 
                    options={props.data} 
                    placeholder={props.span} 
                    defaultValue={ props.default } 
                    onChange={(e)=>{onItemSelect(e)}}
                />
            </label>
        </Fragment>
    )
}
