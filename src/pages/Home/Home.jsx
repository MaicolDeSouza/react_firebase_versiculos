import React from "react";
import styles from "./Home.module.css";

import { useGetPost } from "../../hooks/useGetPost";

const Home = () => {
  const { docs } = useGetPost();

  return (
    <div className={styles.home}>
      <h1>Versiculos</h1>
      {docs &&
        docs.map((doc) => (
          <>
            <li key={doc.id} className={styles.list}>
              <div>
                <span className={styles.title}>Versiculo: </span>
                <span>{doc.verse}</span>
              </div>
              <div>
              <span className={styles.book_chapter}>Capitulo: </span>
                <span>{doc.book}: </span>
                <span>{doc.chapter}</span>
              </div>
            </li>
          </>
        ))}
    </div>
  );
};

export default Home;
