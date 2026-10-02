import { initializeApp } from 'firebase/app';
// importamos unicamente firestore (ya no usamos storage por el cobro)
import { getFirestore } from 'firebase/firestore';

// =========================================================
// reto 1: credenciales de firebase
// =========================================================
const firebaseConfig = {
  apiKey: "AIzaSyDoh8bqoSpGBp_7TD-1vy4ZEPYNqC6dR98",
  authDomain: "practica13-perfil-66163.firebaseapp.com",
  projectId: "practica13-perfil-66163",
  storageBucket: "practica13-perfil-66163.firebasestorage.app",
  messagingSenderId: "1003861602227",
  appId: "1:1003861602227:web:787da603ca90b2af50e5c6"
};
// =========================================================

const app = initializeApp(firebaseConfig);

// inicializamos y exportamos firestore
export const db = getFirestore(app);