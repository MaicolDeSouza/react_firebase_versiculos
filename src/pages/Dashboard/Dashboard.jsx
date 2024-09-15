import React, { useContext} from "react";
import styles from "./Dashboard.module.css";
import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useGetPost } from "../../hooks/useGetPost";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { docsWithUid } = useGetPost(null, user.uid);

  const navigate = useNavigate()

  // Nome do post no banco de dados
  const docCollection = "posts";

  //Deleta o post
  const handleDelete = async (id) => {
    try {
      //Para deletar é necessario, dados do banco, nome do banco e id do post a ser deletado
      await deleteDoc(doc(db, docCollection, id));
    } catch (error) {
      console.log(error);
    }
  };

  //Editar post
  const handleEdit = (id)=>{
    //Chama a pagina edit passando o id do post via navegador
    navigate(`/edit/${id}`)
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.post_header}>
        <span>Conteudo</span>
        <span className={styles.post_action}>Acões</span>
      </div>
      {docsWithUid &&
        docsWithUid.map((doc, i) => (
          <div className={styles.post_doc} key={i}>
            <div>
              <span className={styles.doc_verse}>Versiculo: </span>
              <span>{doc.verse}</span>
              <span className={styles.doc_chapter}>Capitulo: </span>
              <span>{doc.book}: </span>
              <span>{doc.chapter}</span>
            </div>
            <div>
              <button className={styles.button_edit} onClick={() => handleEdit(doc.id)}>Editar</button>
              <button
                className={styles.button_delete}
                onClick={() => handleDelete(doc.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
