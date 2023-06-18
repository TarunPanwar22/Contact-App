// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_iadduxvoD7_GkeLgvVhNdIKACRWVosA",
  authDomain: "vite-contact-8fca6.firebaseapp.com",
  projectId: "vite-contact-8fca6",
  storageBucket: "vite-contact-8fca6.appspot.com",
  messagingSenderId: "948014942212",
  appId: "1:948014942212:web:a586802f4d22e0c3d6cd51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);