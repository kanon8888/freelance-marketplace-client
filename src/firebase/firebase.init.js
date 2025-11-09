// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAxtY_ROWl75YvdgCJYu7H_ln3-P9lk48",
    authDomain: "market-place-dd572.firebaseapp.com",
    projectId: "market-place-dd572",
    storageBucket: "market-place-dd572.firebasestorage.app",
    messagingSenderId: "738877060581",
    appId: "1:738877060581:web:104bdde3d6c572b7386b0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);