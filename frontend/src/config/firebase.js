// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUAyRoxjGvc5mgZg9LQKg7fZj3L_5DjP8",
  authDomain: "youtune-91371.firebaseapp.com",
  projectId: "youtune-91371",
  storageBucket: "youtune-91371.appspot.com",
  messagingSenderId: "39554028472",
  appId: "1:39554028472:web:5aad1dffbd8c959cedf54d",
  measurementId: "G-Z9PGGSY3W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);