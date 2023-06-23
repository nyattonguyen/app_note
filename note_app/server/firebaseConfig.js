import { initializeApp } from "firebase-admin/app";
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
  appId: process.env.appId,
  measurementId: "G-3XDWMVNJLK",
};

// Initialize Firebase
initializeApp(firebaseConfig);
