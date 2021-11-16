import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Inventory from "./routes/Inventory/Inventory";
import Navbar from "./components/Navbar/Navbar";
import Total from "./routes/Total/Total";

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
            <Total />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
