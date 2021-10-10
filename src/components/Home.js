import React from "react";
import '../styles/style.css'
import {BrowserRouter as Route, Link} from 'react-router-dom'

function Home(props) {
    return(
        <ul className="home-list">
            {props.data.map(item=>{
                return(
                    <Link to={`/${item.uid}`} key={item.uid}>
                        <li >{item.name}</li> 
                    </Link>
                );
            })}
        </ul>
    )   
  }
  
  export default Home;