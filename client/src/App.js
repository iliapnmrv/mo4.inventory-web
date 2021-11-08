import React, { } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Form from './components/Form/Form';
import Header from './components/Header/Header';
import List from './components/List/List';
import Inventory from './components/Inventory/Inventory';
import Navbar from './components/Navbar/Navbar';


function App() {
  
  return (
    <Router>
      <Navbar />
      <div className="container">

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/inventory">
            <Header name="Инвентаризация" />
            <Inventory />
          </Route>
          <Route path="/">
            <Header name="Документооборот" />
            <Form />
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
