import React from "react";
import '../styles/style.css'

function ItemPage({item}) {

  const newPerson = () => {
    let select = document.querySelector('#person')
    console.log(select.value)
  }

  return(
    <div className="item-page">
      <h2>{item.name}</h2>
      <div className="item-info">
        <div>
          <span>Место</span>{item.place}
        </div>
        <div>
          <span>МОЛ</span>{item.person}
        </div>
        <select name="" id="person" onChange={()=>newPerson()}>
          <option value="" disabled selected >Передать другому МОЛ</option>
          <option value="0" >Петров</option>
          <option value="1" >Иванов</option>
        </select>
        
      </div>
    </div>
  )
}

export default ItemPage;