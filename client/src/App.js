import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Inventory from "./routes/Inventory/Inventory";
import Navbar from "./components/Navbar/Navbar";
import Total from "./routes/Total/Total";
import Login from "./routes/Auth/Login/Login";
import Registration from "./routes/Auth/Registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "./services/AuthService";

function App() {
  const username = useSelector((state) => state.user.username);
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();

  const checkLogin = () => {
    AuthService.chechAuth();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    dispatchUser({ type: "CHANGE_USER_DATA", payload: username });

    if (!token) {
      dispatchAuth({ type: "TOGGLE_REG_MODAL", payload: true });
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Router>
      <Navbar />
      <Login />
      <Registration />
      <div className="container">
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
