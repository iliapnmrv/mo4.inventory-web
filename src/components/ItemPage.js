import React from "react";
import '../styles/style.css'

function ItemPage(props) {
  console.log(props)
  return(
    <div className="item-page">
      <h2>{props.name}</h2>
      <div className="item-info">
        {props.place}
      </div>
    </div>
  )
}

export default ItemPage;