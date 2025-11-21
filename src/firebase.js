import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, limit } from "firebase/firestore"; // Importa limit y query
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtxzP0395h4kjV62yeiiTEld9Oz3FEBXo",
  authDomain: "testimonios-7e1ad.firebaseapp.com",
  projectId: "testimonios-7e1ad",
  storageBucket: "testimonios-7e1ad.firebasestorage.app",
  messagingSenderId: "1067030036298",
  appId: "1:1067030036298:web:aa9f67a86def428d914bb3",
  measurementId: "G-ZG1F417P88"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, collection, addDoc, getDocs, deleteDoc, doc, query, limit, signInWithPopup, provider, onAuthStateChanged };
