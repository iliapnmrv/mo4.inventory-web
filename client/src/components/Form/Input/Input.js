import React, {Fragment, useState} from 'react'
import './Input.css'

export default function Input(props) {
    const [value, setValue] = useState('')

    const onValueChange = async (e) => {
        props.onInputChange(e)
        setValue(e.target.value)
    }

    return (
        <Fragment>
            <label className={`w-${props.width} form-item`}>
                <span>{props.span}</span>
                <input 
                    type="text" 
                    name={props.name} 
                    className='form-control' 
                    value={value} 
                    onChange={e => {
                        onValueChange(e)
                    }}
                />
            </label>
        </Fragment>
    )
}
