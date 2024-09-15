// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2DdTkEGiT9kHbtzLvZTKcY3yfqYgoDTM",
  authDomain: "react-versiculos.firebaseapp.com",
  projectId: "react-versiculos",
  storageBucket: "react-versiculos.appspot.com",
  messagingSenderId: "1039400666200",
  appId: "1:1039400666200:web:17b3bf2125e21ede7fb62d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Inicializando banco de dados
// Necessario para fazer a autenticação
const db = getFirestore(app);
export { db };