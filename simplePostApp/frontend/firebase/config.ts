// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "simplepostapp-22360.firebaseapp.com",
  projectId: "simplepostapp-22360",
  storageBucket: "simplepostapp-22360.firebasestorage.app",
  messagingSenderId: "226430927301",
  appId: "1:226430927301:web:30fae9481ff36467e24bac",
  measurementId: "G-265XXH36Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
// FirestoreDB에 접근
export const db = getFirestore(app);
