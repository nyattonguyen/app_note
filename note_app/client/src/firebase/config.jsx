// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKD19uiYGuSTz5_cvjTk6rwPsBiuZKgO8",
  authDomain: "note-app-3c377.firebaseapp.com",
  projectId: "note-app-3c377",
  storageBucket: "note-app-3c377.appspot.com",
  messagingSenderId: "468700525562",
  appId: "1:468700525562:web:d0101a207117ffc74daa43",
  measurementId: "G-3XDWMVNJLK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
