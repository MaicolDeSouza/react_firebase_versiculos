import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { db } from "../../firebase/config";
import styles from "./Register.module.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
//Importa contexto para salvar auth e usuario
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  //Para autenticação via google
  const provider = new GoogleAuthProvider();
  //Context API para salvar autenticaco do usuario para ser usado em outras paginas
  const { setAuth, setUser } = useContext(AuthContext);

  //Use states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //Faz a autenticacao com firebase e salva na variavel auth
  const auth = getAuth();

  //Funcao que cria usuario por email e senha
  const createUser = async (data) => {
    //Vai tentar cadastrar usuario
    try {
      //Vai chamar a função para criar usuario e vai salvar em user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //Atualiza nome do usuario na criação da conta
      await updateProfile(user, {
        displayName: data.name,
      });

      //Salva no context Api o valor de auth e user
      setAuth(auth);
      setUser(user);

      console.log(auth);
      //Retorna o resultado se deu tudo certo
      return user;
    } catch (error) {
      //Se firebase retornar erro cai no catch para tratarmos o erro
      console.log(error.message);
      if (error.message.includes("Password")) {
        setError("A senha precisa conter pelo menos 6 caracteres.");
      } else if (error.message.includes("email-already")) {
        setError("E-mail já cadastrado.");
      } else {
        setError("Ocorreu um erro, por favor tenta mais tarde.");
      }
    }
  };

  //Quando botao de registrar é pressionado
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Seta o erro para vazio
    setError("");

    //Verifica se senhas coicidem
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    //Cria objeto com dados do usuario
    const user = {
      name,
      email,
      password,
    };

    //Chama funcao para cadastrar novo usuario
    const res = await createUser(user);

    console.log(res);
    console.log(res?.displayName);
  };

  //Login via conta do google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    //Salva no context Api o valor de auth e user
    setAuth(auth);
    setUser(result.user);
  };

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input
            type="text"
            required
            placeholder="Digite seu Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
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
            placeholder="Escolha uma senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Repita sua senha:</span>
          <input
            type="password"
            required
            placeholder="Repita sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        <button className={styles.button} type="submit">
          Cadastrar
        </button>
      </form>
      <button className={styles.button} onClick={() => loginWithGoogle()}>
        Entrar com Google
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
