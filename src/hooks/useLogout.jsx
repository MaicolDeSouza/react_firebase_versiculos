// eslint-disable-next-line no-unused-vars
import { db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  //Context API para pegar valor salvo de auth
  const { auth, setUser, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  //Funcao para fazer o logout
  const logout = async () => {
    await signOut(auth);
    //Limpa registros no context API
    setUser("");
    setAuth("");
    // Apos logout redireciona para home
    navigate("/");
  };

  return {
    logout,
  };
};
