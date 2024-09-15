import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  //Context API para pegar valor salvo de auth
  const { user } = useContext(AuthContext);
  //Importa função logout do hook useLogout
  const { logout } = useLogout();

  return (
    <nav>
      <ul className={styles.link_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/create-post"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Create Post
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {!user ? (
          <>
            <li>
              <NavLink
                to="/cadastrar"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}

        {user && (
          <li>
            <span>Bem vindo: {user.displayName}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
