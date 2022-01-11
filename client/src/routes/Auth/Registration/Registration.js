import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "components/Form/Input/Input";
import Header from "components/Header/Header";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import AuthService from "services/AuthService";
import { toggleLoginModal, toggleRegModal } from "store/actions/authAction";
import { changeUserData } from "store/actions/userAction";

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
    dispatchAuth(toggleRegModal(false));
    dispatchAuth(toggleLoginModal(true));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const regData = await AuthService.registration(login, password);
    if (!regData?.user) {
      dispatch({ type: "ERROR", message: regData, title: "Ошибка" });
      return;
    }
    dispatchAuth(toggleRegModal(true));
    dispatchUser(changeUserData(regData.user));
    dispatch({
      type: "SUCCESS",
      message: `Добро пожаловать, ${regData.user.login}`,
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
