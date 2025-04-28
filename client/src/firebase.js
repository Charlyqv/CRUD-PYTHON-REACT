// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgBTrrwPHzwTZ4iogPxcaIDrWm9-KMZGg",
    authDomain: "formulario-colaborativo.firebaseapp.com",
    projectId: "formulario-colaborativo",
    storageBucket: "formulario-colaborativo.firebasestorage.app",
    messagingSenderId: "585757884409",
    appId: "1:585757884409:web:f22b976d1eba9fa3a6c728"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);