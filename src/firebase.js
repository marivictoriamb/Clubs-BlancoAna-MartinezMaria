import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {browserLocalPersistence, getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAI1XeopjhBWzuZ1SUFdQX7sNHyaboYV14",
  authDomain: "login-1a9a8.firebaseapp.com",
  projectId: "login-1a9a8",
  storageBucket: "login-1a9a8.appspot.com",
  messagingSenderId: "574920295891",
  appId: "1:574920295891:web:d5f0caf2021db7631b1b26",
  measurementId: "G-T360MHW6X9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
auth.setPersistence(browserLocalPersistence);
googleProvider.setCustomParameters({prompt: "select_account"});

export const storage = getStorage(app);