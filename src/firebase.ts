import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdT4m4RgXixEj4J_HB9AfJberZ5mwiK7M",
  authDomain: "lorem-552d6.firebaseapp.com",
  projectId: "lorem-552d6",
  storageBucket: "lorem-552d6.appspot.com",
  messagingSenderId: "755691002412",
  appId: "1:755691002412:web:797b916cf206bd37414f89",
  measurementId: "G-X73G8DYSG6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
