import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc as docFirebase,
  getDoc,
} from "firebase/firestore";

//UseGetPost pode receber os parametros d e uid se nao receber defiine os mesmos com null
export const useGetPost = (id = null, uid = null) => {
  const [docs, setDocs] = useState("");
  const [doc, setDoc] = useState("");
  const [docsWithUid, setDocsWithUid] = useState("");

  // Nome do post no banco de dados
  const docCollection = "posts";

  useEffect(() => {
    //Se a chamada tiver ID indica que estou buscando documento com ID especificado
    if (id) {
      const getPostWithId = async () => {
        try {
          const docRef = await docFirebase(db, docCollection, id);
          const docSnap = await getDoc(docRef);
          setDoc(docSnap.data());
        } catch (error) {
          console.log(error);
        }
      };
      getPostWithId();
    }

    //Se a chamada tiver UID indica que estou buscando todos os posts do UID especificado
    else if (uid) {
      const getPostsWithUid = async () => {
        try {
          const q = await query(
            collection(db, docCollection),
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
          await onSnapshot(q, (querySnapshot) => {
            setDocsWithUid(
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          });
        } catch (error) {
          console.log(error);
        }
      };
      getPostsWithUid();
    }

    //Busca todos os posts para mostrar na pagina Home
    else {
      const getPosts = async () => {
        try {
          const q = await query(
            collection(db, docCollection),
            orderBy("createdAt", "desc")
          );
          await onSnapshot(q, (querySnapshot) => {
            setDocs(
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          });
        } catch (error) {
          console.log(error);
        }
      };
      getPosts();
    }
  }, [id, uid]);

  return { doc, docs, docsWithUid };
};
