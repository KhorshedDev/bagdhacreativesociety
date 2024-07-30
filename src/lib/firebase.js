// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAswxPPiZc0-Hr5Pb0y9LoF8gzTNPWAIPE",
  authDomain: "bagdhacreativesocity.firebaseapp.com",
  projectId: "bagdhacreativesocity",
  storageBucket: "bagdhacreativesocity.appspot.com",
  messagingSenderId: "569090244556",
  appId: "1:569090244556:web:087507e670443230356769",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
