import React, {Fragment} from 'react'
import './Select.css'

export default function Select(props) {
    return (
        <Fragment>
            <label className={`w-${props.width} form-item`}>
                <span>{props.span}</span>
                <select name={props.name} id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </label>
        </Fragment>
    )
}
