import React, {useState} from "react";
import '../styles/style.css'
import {Link} from 'react-router-dom'

function Header() {

  
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
  