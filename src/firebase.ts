import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh3ZahfTMgHL8C17q-zbQAcYKS2lEFq2U",
  authDomain: "coffee-dripper-c8097.firebaseapp.com",
  projectId: "coffee-dripper-c8097",
  storageBucket: "coffee-dripper-c8097.firebasestorage.app",
  messagingSenderId: "356747002408",
  appId: "1:356747002408:web:1ed646df1ac02cefaf6b1d",
  measurementId: "G-6DDL13E8NS",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
