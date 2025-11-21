// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Tu configuración de Firebase
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

// Exportar la configuración de Firestore
export { db, collection, addDoc, getDocs };
