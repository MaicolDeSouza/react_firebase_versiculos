import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
//Importa contexto para salvar auth e usuario
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  //Para autenticação via google
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Context API para salvar autenticaco do usuario para ser usado em outras paginas
  const { setAuth, setUser } = useContext(AuthContext);

  const auth = getAuth();

  //Faz login com email e senha
  const login = async (data) => {
    try {
      //Faz o login e retorna o dados do ususario em user
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(user);
      setAuth(auth);
      setUser(user);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }
      setError(systemErrorMessage);
    }
  };

  //Quando botao entrar é pressioando
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    //Cria objeto com dados do usuario
    const user = {
      email,
      password,
    };
    //Chama funcao para fazer o login
    login(user);
  };

  //Faz login com google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    //Salva no context Api o valor de auth e user
    setAuth(auth);
    setUser(result.user);
  };

  return (
    <div className={styles.login}>
      <h1>Faça seu login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            required
            placeholder="Digite uma senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button className={styles.button} type="submit">
          Entrar
        </button>
      </form>
      <button className={styles.button} onClick={() => loginWithGoogle()}>
        Entrar com Google
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
