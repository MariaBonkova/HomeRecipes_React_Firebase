// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEUwfsxK6mMxiHuWx3m5mZFZ4iUjEZ6rM",
    authDomain: "react-firebase-project-21742.firebaseapp.com",
    projectId: "react-firebase-project-21742",
    storageBucket: "react-firebase-project-21742.appspot.com",
    messagingSenderId: "726152881248",
    appId: "1:726152881248:web:6c69cd0059691e75a64f05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new  GoogleAuthProvider();
export const db= getFirestore(app);