import React, { useEffect, useState } from "react";
import styles from "./Edit.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPost } from "../../hooks/useGetPost";
import { updateDoc, doc as docFirebase } from "firebase/firestore";
import { db } from "../../firebase/config";


const Edit = () => {
  //Pega ID da mensagem nos parametros do navegador
  const { id } = useParams();
  //Busca o post com o ID especificado
  const { doc } = useGetPost(id,null);
  const navigate = useNavigate();

  const [verse, setVerse] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [msg, setMsg] = useState("");

  //Apenas executa esse useeffect quando doc for modficado
  useEffect(() => {
    if (doc) {
      setVerse(doc.verse);
      setBook(doc.book);
      setChapter(doc.chapter);
    }
  }, [doc]);

  // Nome do post no banco de dados
  const docCollection = "posts";

  //Comando qua atualiza dados no firebase
  const updateDocument = async (data) => {
    try {
      const docRef = await docFirebase(db, docCollection, id);
      await updateDoc(docRef, data);
      //Se update foi sucesso volta para a pagina dashboard
      navigate("/dashboard") 
    } catch (error) {
      setMsg('Ocorreu um erro')
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    //Monta objeto com os dados
    const document = {
      verse: verse,
      book: book,
      chapter: chapter,
    };

    //Chama função para fazer o update passando os dados
    updateDocument(document) 
  };

  return (
    <div>
      <form onSubmit={handleEdit}>
        <label>
          <span>Versiculo</span>
          <textarea
            onChange={(e) => {
              setVerse(e.target.value);
            }}
            value={verse}
          />
        </label>
        <label>
          <span>Livro</span>
          <input
            onChange={(e) => {
              setBook(e.target.value);
            }}
            value={book}
          />
        </label>
        <label>
          <span>Capitulo : versiculo</span>
          <input
            type="number"
            onChange={(e) => {
              setChapter(e.target.value);
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

export default Edit;
