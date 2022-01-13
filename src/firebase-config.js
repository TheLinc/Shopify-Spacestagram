// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoCLDaTWVgktHwcss5VYaU64yUNqec9Ek",
  authDomain: "shopify-spacestagram.firebaseapp.com",
  projectId: "shopify-spacestagram",
  storageBucket: "shopify-spacestagram.appspot.com",
  messagingSenderId: "622164175198",
  appId: "1:622164175198:web:1f87aed625585c33c547cf",
  measurementId: "G-L9E6YC1Y1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
