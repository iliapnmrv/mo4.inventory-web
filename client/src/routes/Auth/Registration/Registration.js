import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Form/Input/Input";
import useForm from "../../../hooks/useForm";
import useNotification from "../../../hooks/useNotification";

import AuthService from "../../../services/AuthService";

export default function Registration() {
  const dispatch = useNotification();
  const dispatchUser = useDispatch();
  const username = useSelector((state) => state.user.username);

  const {
    values: { login, password },
    changeHandler,
  } = useForm({
    login: "",
    password: "",
  });

  console.log(login, password);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { regMessage, regSuccess } = await AuthService.registration(
      login,
      password
    );
    if (!regMessage?.user) {
      dispatch({ type: "ERROR", message: regMessage, title: "Успех" });
      return;
    }
    localStorage.setItem("token", regMessage.accessToken);
    dispatchUser({ type: "CHANGE_USER_DATA", payload: regMessage.user.login });
  };

  return (
    <>
      <form className="form slide" onSubmit={(e) => onSubmitForm(e)}>
        <Input
          span="Введите логин"
          name="login"
          value={login}
          onChange={changeHandler}
        />
        <Input
          span="Введите пароль"
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
        />
        <button className="btn success" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}
