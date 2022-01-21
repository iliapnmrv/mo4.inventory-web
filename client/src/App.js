import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Inventory from "./routes/Inventory/Inventory";
import Navbar from "./components/Navbar/Navbar";
import Total from "./routes/Total/Total";
import Login from "./routes/Auth/Login/Login";
import Registration from "./routes/Auth/Registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "./services/AuthService";
import "./styles/main.sass";
import $api from "http/index.js";
import {
  changeOwnersData,
  changePersonsData,
  changeSredstvaData,
  changeStatusesData,
  changeStoragesData,
  changeTypesData,
} from "store/actions/infoAction";
import { changeUserData } from "store/actions/userAction";
import { toggleRegModal } from "store/actions/authAction";
import Catalogs from "routes/Catalogs/Catalogs";

function App() {
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();
  const dispatchInfo = useDispatch();

  const { token } = useSelector(({ user }) => user);

  useEffect(() => {
    const fetchData = async () => {
      const types = await $api.get(`types`).then(({ data }) => data);
      dispatchInfo(changeTypesData(types));

      const sredstva = await $api.get(`sredstva`).then(({ data }) => data);
      dispatchInfo(changeSredstvaData(sredstva));

      const statuses = await $api.get(`statuses`).then(({ data }) => data);
      dispatchInfo(changeStatusesData(statuses));

      const persons = await $api.get(`persons`).then(({ data }) => data);
      dispatchInfo(changePersonsData(persons));

      const storages = await $api.get(`storages`).then(({ data }) => data);
      dispatchInfo(changeStoragesData(storages));

      const owners = await $api.get(`owners`).then(({ data }) => data);
      dispatchInfo(changeOwnersData(owners));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      if (token) {
        const { user, accessToken, refreshToken } =
          await AuthService.checkAuth();
        dispatchUser(changeUserData(user));
      } else {
        dispatchAuth(toggleRegModal(true));
      }
    };

    checkLogin();
  }, [token]);

  return (
    <Router>
      <Navbar />
      <Registration />
      <Login />
      <div className="container">
        <Switch>
          <Route path="/inventory">
            <Header name="Инвентаризация" />
            <Inventory />
          </Route>
          <Route path="/catalogs">
            <Header name="Справочники" />
            <Catalogs />
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
