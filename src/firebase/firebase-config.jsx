// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWm-cNPLIHRXaasZzTEBfxhbAPpo6Thbs",
  authDomain: "monkey-blog-cb78e.firebaseapp.com",
  projectId: "monkey-blog-cb78e",
  storageBucket: "monkey-blog-cb78e.appspot.com",
  messagingSenderId: "536196525428",
  appId: "1:536196525428:web:aec30544cdd659c0ab5021",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
