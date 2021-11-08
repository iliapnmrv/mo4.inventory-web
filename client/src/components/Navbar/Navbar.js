import React from 'react'
import {
    Link
  } from "react-router-dom";

import './Navbar.css'

export default function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Документооборот</Link>
                    </li>
                    <li>
                        <Link to="/inventory">Инвентаризация</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
