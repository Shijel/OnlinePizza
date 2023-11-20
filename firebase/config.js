// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC41HOY1VNppWkj6WsFO0MmeD3K1Q1XyVY",
  authDomain: "pizza-store-f9d82.firebaseapp.com",
  projectId: "pizza-store-f9d82",
  storageBucket: "pizza-store-f9d82.appspot.com",
  messagingSenderId: "238284112663",
  appId: "1:238284112663:web:61263edf608e4bf518ad52",
};

// Initialize Firebase
export const initApp = () => initializeApp(firebaseConfig);
