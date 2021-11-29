import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../../components/Form/Input/Input";
import Header from "../../../components/Header/Header";
import useForm from "../../../hooks/useForm";
import useNotification from "../../../hooks/useNotification";
import AuthService from "../../../services/AuthService";
import "../Auth.css";

export default function Login() {
  const dispatch = useNotification();
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();
  const loginVisible = useSelector((state) => state.auth.loginVisible);

  const {
    values: { login, password },
    changeHandler,
  } = useForm({
    login: "",
    password: "",
  });

  const showReg = () => {
    dispatchAuth({ type: "TOGGLE_REG_MODAL", payload: true });
    dispatchAuth({ type: "TOGGLE_LOGIN_MODAL", payload: false });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { loginMessage, loginSuccess } = await AuthService.login(
      login,
      password
    );
    if (!loginMessage?.user) {
      dispatch({ type: "ERROR", message: loginMessage, title: "Успех" });
      return;
    }
    dispatchAuth({ type: "TOGGLE_LOGIN_MODAL", payload: false });
    localStorage.setItem("token", loginMessage.accessToken);
    dispatchUser({
      type: "CHANGE_USER_DATA",
      payload: loginMessage.user.login,
    });
    dispatch({
      type: "SUCCESS",
      message: `Добро пожаловать, ${loginMessage.user.login}`,
      title: "Успех",
    });
  };

  return (
    <>
      {loginVisible && (
        <div className="modal-container">
          <div className="auth-modal">
            <Header name="Войдите" />
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
                Войти
              </button>
            </form>
            <div className="other-options">
              Нет аккаунта? <span onClick={showReg}>Зарегистрируйтесь</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
