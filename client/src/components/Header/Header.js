import React from 'react'
import './Header.css'

export default function Header(props) {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}
