// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9MNpE41Ur3pYR7sidGY6tOM53w3aSKTQ",
  authDomain: "digital-life-lessons-f43b0.firebaseapp.com",
  projectId: "digital-life-lessons-f43b0",
  storageBucket: "digital-life-lessons-f43b0.firebasestorage.app",
  messagingSenderId: "267214261580",
  appId: "1:267214261580:web:e04d18e080bd5a7a5353e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);