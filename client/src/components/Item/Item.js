import React, {} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import './Item.css'

export default function Item(props) {

    return (
        <>
            <tr 
                data-id={props.data.qr}
                key={props.data.qr}
            >
                <td>{props.data.qr}</td>
                <td>{props.data.sredstvo_name}</td>
                <td>{props.data.type_name}</td>
                <td>{props.data.month}</td>
                <td>{props.data.year}</td>
                <td>{props.data.name}</td>
                <td>{props.data.model}</td>
                <td>{props.data.sernom}</td>
                <span 
                    className="icon"
                    onClick={()=>props.openModal(props.data.qr)}
                >
                    <FontAwesomeIcon 
                        icon={faEdit}
                    />
                </span>
                
            </tr> 
        </>
    )
}
