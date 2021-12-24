import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Inventory from "./routes/Inventory/Inventory";
import Navbar from "./components/Navbar/Navbar";
import Total from "./routes/Total/Total";
import Login from "./routes/Auth/Login/Login";
import Registration from "./routes/Auth/Registration/Registration";
import { useDispatch } from "react-redux";
import AuthService from "./services/AuthService";
import "./styles/main.sass";
import $api from "http/index.js";

function App() {
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();
  const dispatchInfo = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const types = await $api.get(`/types`).then(({ data }) => data);
      dispatchInfo({ type: "CHANGE_TYPES_DATA", payload: types });

      const sredstva = await $api.get(`sredstva`).then(({ data }) => data);
      dispatchInfo({ type: "CHANGE_SREDSTVA_DATA", payload: sredstva });

      const statuses = await $api.get(`statuses`).then(({ data }) => data);
      dispatchInfo({ type: "CHANGE_STATUSES_DATA", payload: statuses });

      const persons = await $api.get(`persons`).then(({ data }) => data);
      dispatchInfo({ type: "CHANGE_PERSONS_DATA", payload: persons });

      const storages = await $api.get(`storages`).then(({ data }) => data);
      dispatchInfo({ type: "CHANGE_STORAGES_DATA", payload: storages });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      if (localStorage.getItem("token")) {
        const { user, accessToken, refreshToken } =
          await AuthService.checkAuth();
        dispatchUser({
          type: "CHANGE_USER_DATA",
          payload: user,
        });
      } else {
        dispatchAuth({ type: "TOGGLE_REG_MODAL", payload: true });
      }
    };

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
