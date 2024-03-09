import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {browserLocalPersistence, getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAa87wvUYyYTYcb7mzAZUPQOqIivLYqvtQ",
  authDomain: "clubs-947b2.firebaseapp.com",
  projectId: "clubs-947b2",
  storageBucket: "clubs-947b2.appspot.com",
  messagingSenderId: "440638820993",
  appId: "1:440638820993:web:4b33c0d84e341d8f91b380",
  measurementId: "G-PVQES351Q0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
auth.setPersistence(browserLocalPersistence);
googleProvider.setCustomParameters({prompt: "select_account"});

export const storage = getStorage(app);