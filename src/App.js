import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from "./components/Header";
import Home from "./components/Home";
import ItemPages from "./components/ItemPages";


function App() {
  const data = [
    {
      uid: 1,
      name: "My name",
      place: "Офис 1"
    },
    {
      uid: 2,
      name: "My name2",
      place: "Офис 2"
    },
  ]

  return (
    <div className="page">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {/* Домашняя страница со списком всех вещей */}
              <Home data={data} />
            </Route>
            {/* Рендеринг всех страниц для дальнейшего вызова */}
            <ItemPages data={data} />
          </Switch>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
