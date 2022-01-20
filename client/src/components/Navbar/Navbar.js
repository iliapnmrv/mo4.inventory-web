import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthService from "services/AuthService";
import { toggleLoginModal } from "store/actions/authAction";
import { changeUserData } from "store/actions/userAction";

export default function Navbar() {
  const dispatchUser = useDispatch();
  const dispatchAuth = useDispatch();

  const { login, role } = useSelector((state) => state.user.username);

  const handleLogout = () => {
    AuthService.logout();
    dispatchAuth(toggleLoginModal(true));
    dispatchUser(changeUserData("guest"));
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
          {role === "admin" ? (
            <li>
              <Link to="/catalogs">Справочники</Link>
            </li>
          ) : null}
        </ul>
        <button className="btn logout" onClick={handleLogout}>
          Выйти
        </button>
      </nav>
    </>
  );
}
