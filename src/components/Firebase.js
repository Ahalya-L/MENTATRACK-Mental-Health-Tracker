// Firebase initialization (Firebase.js)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArmWuVobP83ljvMMuJtAMRxPSLpjCIkAs",
  authDomain: "mentatrack-48112.firebaseapp.com",
  projectId: "mentatrack-48112",
  storageBucket: "mentatrack-48112.appspot.com",
  messagingSenderId: "699632202766",
  appId: "1:699632202766:web:adfe128679c7932381f85f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
