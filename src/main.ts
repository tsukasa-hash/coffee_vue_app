import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import App from "./App.vue";
import router from "./router";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh3ZahfTMgHL8C17q-zbQAcYKS2lEFq2U",
  authDomain: "coffee-dripper-c8097.firebaseapp.com",
  projectId: "coffee-dripper-c8097",
  storageBucket: "coffee-dripper-c8097.firebasestorage.app",
  messagingSenderId: "356747002408",
  appId: "1:356747002408:web:1ed646df1ac02cefaf6b1d",
  measurementId: "G-6DDL13E8NS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAuth(app);
// const analytics = getAnalytics(app);
createApp(App).use(router).use(VueAxios, axios).mount("#app");
