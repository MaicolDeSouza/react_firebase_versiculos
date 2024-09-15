import React, { useState, useContext } from "react";
import styles from "./CreatePost.module.css";
import { db } from "../../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
//Importa contexto para pegar UID do usuario
import { AuthContext } from "../../contexts/AuthContext";

const CreatePost = () => {
  const [verse, setVerse] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  //Context API para salvar autenticaco do usuario para ser usado em outras paginas
  const { user } = useContext(AuthContext);

  // Nome do post no banco de dados
  const docCollection = "posts";

  const insertDocument = async (document) => {
    try {
      //Cria um novo objeto com os dados do usuario e + timestamp
      const newDocument = { ...document, createdAt: Timestamp.now() };

      //SDK addDoc adiciona os dados ao banco de dados
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );
      setVerse("");
      setBook("");
      setChapter("");
      setMsg("Dados salvos com sucesso");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const document = {
      verse: verse,
      book: book,
      chapter: chapter,
      uid: user.uid,
    };

    insertDocument(document);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Versiculo</span>
          <textarea
            required
            placeholder="Digite um versiculo"
            onChange={(e) => {
              setVerse(e.target.value);
              setMsg("");
            }}
            value={verse}
          />
        </label>
        <label>
          <span>Livro</span>
          <input
            required
            placeholder="Digite o livro da biblia"
            onChange={(e) => {
              setBook(e.target.value);
              setMsg("");
            }}
            value={book}
          />
        </label>
        <label>
          <span>Capitulo : versiculo</span>
          <input
            type="number"
            required
            placeholder="Digite o capitulo e versiculo"
            onChange={(e) => {
              setChapter(e.target.value);
              setMsg("");
            }}
            value={chapter}
          />
        </label>
        <button type="submit" className={styles.button}>
          Salvar
        </button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default CreatePost;
