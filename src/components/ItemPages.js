import React from "react";
import ItemPage from "./ItemPage";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function ItemPages(props) {
    return(
        props.data.map(item=>{
            return(
                <Route path={`/${item.uid}`}>
                    <ItemPage item={item} key={item.uid} />
                </Route>
            );
        })
    )   
  }
  
  export default ItemPages;
  