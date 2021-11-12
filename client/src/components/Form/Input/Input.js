import React from 'react'
import './Input.css'

export default function Input({span, type = 'text', name, value, onChange, required=true, max}) {

    return (
        <>
             <label className='form-item'>
                <span className={required && 'required'}>{span}</span>
                <input 
                    required={required}
                    max={max}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </>
    )
}
