import React from 'react'
import './Input.css'

export default function Input({span, type = 'text', name, value, onChange}) {

    return (
        <>
             <label className='form-item'>
                <span>{span}</span>
                <input 
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </>
    )
}
