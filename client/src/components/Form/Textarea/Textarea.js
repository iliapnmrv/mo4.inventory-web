import React, {useEffect, useState} from 'react'

export default function Textarea(props) {
    const [value, setValue] = useState('')

    const onValueChange = async (e) => {
        props.onInputChange(e)
        setValue(e.target.value)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <>
            <label className='form-item'>
                <span>{props.span}</span>
                <textarea 
                    type="text" 
                    name={props.name} 
                    className='form-control' 
                    value={value} 
                    onChange={e => {
                        onValueChange(e)
                    }}
                />
            </label>
        </>
    )
}
