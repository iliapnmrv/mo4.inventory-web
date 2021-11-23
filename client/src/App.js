import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Inventory from "./routes/Inventory/Inventory";
import Navbar from "./components/Navbar/Navbar";
import Total from "./routes/Total/Total";
import Login from "./routes/Auth/Login/Login";
import Registration from "./routes/Auth/Registration/Registration";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/login">
            <Header name="Войдите" />
            <Login />
          </Route>
          <Route path="/registration">
            <Header name="Зарегистрируйтесь" />
            <Registration />
          </Route>
          <Route path="/inventory">
            <Navbar />
            <Header name="Инвентаризация" />
            <Inventory />
          </Route>
          <Route path="/">
            <Navbar />
            <Header name="Документооборот" />
            <Total />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
