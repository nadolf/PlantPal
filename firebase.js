
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6xlFxmpgs1o0vLkSYRc8x28IZEpvWvQc",
  authDomain: "plantpal-15355.firebaseapp.com",
  projectId: "plantpal-15355",
  storageBucket: "plantpal-15355.appspot.com",
  messagingSenderId: "27428921531",
  appId: "1:27428921531:web:85cc189a9878bf9cc0c99e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =  getAuth(app);