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
          <NavLink to="/">Home</NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/create-post">Create Post</NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        )}
        {!user ? (
          <>
            <li>
              <NavLink to="/cadastrar">Cadastrar</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
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
