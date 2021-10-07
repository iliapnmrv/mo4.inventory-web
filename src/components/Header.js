import React, {useState} from "react";
import '../styles/style.css'
import {BrowserRouter as Route, Link, useLocation } from 'react-router-dom'

function Header() {


    const location = useLocation();
    console.log(location.pathname);
  
    return (
      <div className="app-header flex">
        <h1>Инвентаризация</h1>
        
          <Link to="/">
            <div className="back-home">
              Вернуться на главную
            </div>
          </Link>
        
      </div>
    );
  }
  
  export default Header;
  