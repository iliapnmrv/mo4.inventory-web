import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthService from "services/AuthService";

export default function Navbar() {
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();

  const handleLogout = () => {
    AuthService.logout();
    dispatchAuth({ type: "TOGGLE_LOGIN_MODAL", payload: true });
    dispatchUser({ type: "CHANGE_USER_DATA", payload: "guest" });
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Документооборот</Link>
          </li>
          <li>
            <Link to="/inventory">Инвентаризация</Link>
          </li>
        </ul>
        <button className="btn logout" onClick={handleLogout}>
          Выйти
        </button>
      </nav>
    </>
  );
}
