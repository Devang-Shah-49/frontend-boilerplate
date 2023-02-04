// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGuy2YrecD2e7vs7DgwaByZdaooLHCGDM",
  authDomain: "xreventi.firebaseapp.com",
  projectId: "xreventi",
  storageBucket: "xreventi.appspot.com",
  messagingSenderId: "216621503142",
  appId: "1:216621503142:web:3c39ef3d1b276ff3b2da67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)  
