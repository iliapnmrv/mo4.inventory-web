import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "components/Form/Input/Input";
import Header from "components/Header/Header";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import AuthService from "services/AuthService";

export default function Registration() {
  const dispatch = useNotification();
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();

  const regVisible = useSelector((state) => state.auth.regVisible);

  const {
    values: { login, password },
    changeHandler,
  } = useForm({
    login: "",
    password: "",
  });

  const showLogin = () => {
    dispatchAuth({ type: "TOGGLE_REG_MODAL", payload: false });
    dispatchAuth({ type: "TOGGLE_LOGIN_MODAL", payload: true });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { regMessage, regSuccess } = await AuthService.registration(
      login,
      password
    );
    if (!regMessage?.user) {
      dispatch({ type: "ERROR", message: regMessage, title: "Ошибка" });
      return;
    }
    dispatchAuth({ type: "TOGGLE_REG_MODAL", payload: false });
    localStorage.setItem("token", regMessage.accessToken);
    localStorage.setItem("username", JSON.stringify(regMessage.user));
    dispatchUser({ type: "CHANGE_USER_DATA", payload: regMessage.user });
    dispatch({
      type: "SUCCESS",
      message: `Добро пожаловать, ${regMessage.user.login}`,
    });
  };

  return (
    <>
      {regVisible && (
        <div className="md-container">
          <div className="auth-modal">
            <Header name="Зарегистрируйтесь" />
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
            <div className="other-options">
              Есть аккаунт? <span onClick={showLogin}>Войдите</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
