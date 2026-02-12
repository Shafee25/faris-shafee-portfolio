import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO-LG2t3YRvdhPIWyPcjBtnr3yIYh2l8c",
  authDomain: "portfolio-217e2.firebaseapp.com",
  projectId: "portfolio-217e2",
  storageBucket: "portfolio-217e2.firebasestorage.app",
  messagingSenderId: "440639895251",
  appId: "1:440639895251:web:09625cfdd1f0e9b935c626"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);