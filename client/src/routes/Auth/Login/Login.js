import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "components/Form/Input/Input";
import Header from "components/Header/Header";
import useForm from "hooks/useForm";
import useNotification from "hooks/useNotification";
import AuthService from "services/AuthService";
import "../Auth.css";
import { toggleLoginModal, toggleRegModal } from "store/actions/authAction";
import { changeUserData } from "store/actions/userAction";

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
    dispatchAuth(toggleRegModal(true));
    dispatchAuth(toggleLoginModal(false));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const loginData = await AuthService.login(login, password);
    if (!loginData?.user) {
      dispatch({
        type: "ERROR",
        message: loginData,
        title: "Произошла ошибка",
      });
      return;
    }
    dispatchAuth(toggleLoginModal(false));
    dispatchUser(changeUserData(loginData.user));
    dispatch({
      type: "SUCCESS",
      message: `Добро пожаловать, ${loginData.user.login}`,
    });
  };

  return (
    <>
      {loginVisible && (
        <div className="md-container">
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
