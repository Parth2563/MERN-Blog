// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-121a9.firebaseapp.com",
  projectId: "mern-blog-121a9",
  storageBucket: "mern-blog-121a9.appspot.com",
  messagingSenderId: "717467196464",
  appId: "1:717467196464:web:5f7b225b3957b1ebf721f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
