// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// 🔹 Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBXP9-kbfja2CULcxfQrqSFwD5onMCMAMA",
  authDomain: "charityapp-cde6c.firebaseapp.com",
  projectId: "charityapp-cde6c",
  storageBucket: "charityapp-cde6c.firebasestorage.app",
  messagingSenderId: "206485765873",
  appId: "1:206485765873:web:80b9d59f11e7d2e018b350",
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Set up authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
